import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        id: 1,
        title: 'finish vue Screencast',
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: 'takeover world',
        completed: false,
        editing: false,
      },
    ],
  },
  getters: {
    todo(state, index) {
      return state.todos[index];
    },
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
  },
  actions: {
    addTodo(context, todo) {
      setTimeout(() => context.commit('addTodo', todo), 2000);
    },
    updateTodo(context, todo) {
      context.commit('updateTodo', todo);
    },
    // eslint-disable-next-line no-unused-vars
    deleteTodo(context, id) {
      setTimeout(() => context.commit('deleteTodo', id), 1000);
    },
  },
});
