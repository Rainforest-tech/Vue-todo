import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import db from './firebase';

Vue.use(Vuex);
axios.defaults.baseURL = 'http://todo-laravel.test/api';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    filter: 'all',
    todos: [],
  },
  getters: {
    loggedIn: state => state.token !== null,
    todo: state => index => state.todos[index],
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemainig(getters) {
      return getters.remaining !== 0;
    },
    todosFiltered(state) {
      switch (state.filter) {
        case 'active':
          return state.todos.filter(todo => !todo.completed);
        case 'completed':
          return state.todos.filter(todo => todo.completed);
        default:
          return state.todos;
      }
    },
    showClearCompleatedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    },
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
      });
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    checkAll(state, event) {
      // eslint-disable-next-line no-return-assign
      state.todos.forEach(todo => (todo.completed = event));
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      });
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id === id);
      state.todos.splice(index, 1);
    },
    retrieveTodos(state, todos) {
      state.todos = todos;
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    register({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/register', credentials)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(response => reject(response));
      });
    },
    retrieveToken({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', credentials)
          .then(({ data }) => {
            const { access_token: token } = data;
            localStorage.setItem('access_token', token);
            commit('retrieveToken', token);
            resolve(data);
          })
          .catch(response => reject(response));
      });
    },
    destroyToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.post('/logout', null, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.token}`,
          },
        })
          .then(() => {
            localStorage.removeItem('access_token');
            commit('destroyToken');
            resolve();
          })
          .catch((response) => {
            localStorage.removeItem('access_token');
            reject(response);
          });
      });
    },
    retrieveTodos({ commit }) {
      axios.get('/todos')
        .then(({ data }) => commit('retrieveTodos', data))
        .catch(response => console.log(response));
      // db.collection('todos').get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       console.log(doc.data());
      //     });
      //   });
    },
    addTodo({ commit }, todo) {
      axios.post('/todos', todo)
        .then(({ data }) => commit('addTodo', data))
        .catch(response => console.log(response));
    },
    updateTodo({ commit }, todo) {
      axios.patch(`/todos/${todo.id}`, todo)
        .then(({ data }) => commit('updateTodo', data))
        .catch(response => console.log(response));
    },
    checkAll({ commit }, checked) {
      axios.patch('/todosCheckAll', {
        completed: checked,
      })
        .then(() => commit('checkAll', checked))
        .catch(response => console.log(response));
    },
    // eslint-disable-next-line no-unused-vars
    deleteTodo({ commit }, id) {
      axios.delete(`/todos/${id}`)
        .then(() => commit('deleteTodo', id))
        .catch(response => console.log(response));
    },
    clearCompleted({ commit, state }) {
      const completed = state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      axios.delete('/todosDeleteCompleted', {
        data: { todos: completed },
      })
        .then(() => commit('clearCompleted'))
        .catch(response => console.log(response));
    },
  },
});
