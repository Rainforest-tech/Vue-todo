/* eslint-disable dot-notation */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import db from './firebase';
// import './plugins/axios';

axios.interceptors.request.use(
  (config) => {
    config.baseURL = 'http://127.0.0.1:8000/api';
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
  },
  error => Promise.reject(error),
);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    filter: 'all',
    todos: [],
  },
  getters: {
    loggedIn: state => state.token !== null,
    todo: state => index => state.todos[index],
    remaining: state => state.todos.filter(todo => !todo.completed).length,
    anyRemainig: getters => getters.remaining !== 0,
    todosFiltered: (state) => {
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
    clearTodos(state) {
      state.todos = [];
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    },
    destroyToken(state) {
      state.token = null;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    register({ commit }, credentials) {
      return axios.post('/register', credentials)
        .then(({ data }) => data)
        .catch(error => Promise.reject(error.response));
    },
    retrieveToken({ commit }, credentials) {
      return axios.post('/login', credentials)
        .then(({ data }) => {
          const { token } = data;
          localStorage.setItem('access_token', token);
          commit('retrieveToken', token);
        })
        .catch(error => Promise.reject(error.response));
    },
    async destroyToken({ commit }) {
      axios.post('/logout', null)
        .then(() => {
          localStorage.removeItem('access_token');
          commit('destroyToken');
        })
        .catch(() => {
          localStorage.removeItem('access_token');
        });
    },
    clearTodos({ commit }) {
      commit('clearTodos');
    },
    retrieveName({ state }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

      console.log(localStorage.getItem('access_token'));
      return axios.get('/user')
        .then(({ data }) => data);
    },
    retrieveTodos({ commit }) {
      axios.get('/todos')
        .then(({ data }) => commit('retrieveTodos', data))
        .catch(response => response);
    },
    addTodo({ commit }, todo) {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      axios.post('/todos', todo)
        .then(({ data }) => commit('addTodo', data))
        .catch(response => response);
    },
    updateTodo({ commit }, todo) {
      axios.patch(`/todos/${todo.id}`, todo)
        .then(({ data }) => commit('updateTodo', data))
        .catch(response => response);
    },
    checkAll({ commit }, checked) {
      axios.patch('/todosCheckAll', {
        completed: checked,
      })
        .then(() => commit('checkAll', checked))
        .catch(response => response);
    },
    // eslint-disable-next-line no-unused-vars
    deleteTodo({ commit }, id) {
      axios.delete(`/todos/${id}`)
        .then(() => commit('deleteTodo', id))
        .catch(response => response);
    },
    clearCompleted({ commit, state }) {
      const completed = state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      axios.delete('/todosDeleteCompleted', {
        data: { todos: completed },
      })
        .then(() => commit('clearCompleted'))
        .catch(response => response);
    },
  },
});
