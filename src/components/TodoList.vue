<template>
    <div>
        <input type="text" class="todo-input"
               placeholder="What needs to be done"
               v-model="newTodo"
               @keyup.enter="addTodo"
        >
        <transition-group name="fade"
                          enter-active-class='animated fadeInUp'
                          leave-active-class='animated fadeOutDown'>
            <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id"
                       :todo="todo" :index="index"
                       :checkAll="!anyRemainig"
                       @removedTodo="removeTodo"
                       @finishedEdit="finishedEdit">

            </todo-item>
        </transition-group>
        <div class="extra-container">
            <div>
                <label>
                    <input type="checkbox" :checked="!anyRemainig"
                           @change="checkAllTodos">
                    Check All
                </label>
            </div>
            <div>{{remainig}} items left</div>
        </div>
        <div class="extra-container">
            <div>
                <button :class="{active: filter ==='all'}"
                        @click="filter='all'">All
                </button>
                <button :class="{active: filter ==='active'}"
                        @click="filter='active'">Active
                </button>
                <button :class="{active: filter ==='completed'}"
                        @click="filter='completed'">Completed
                </button>
            </div>
            <div>
                <transition appear mode="in-out"
                            enter-active-class="animate fadeInUp"
                            leave-active-class="animate flipOutY">
                    <button v-if="showClearCompleatedButton"
                            @click="clearCompleted"
                    >Clear completed
                    </button>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
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
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
      });
      this.newTodo = '';
      this.idForTodo += 1;
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    },


    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos(event) {
      // eslint-disable-next-line no-return-assign
      this.todos.map(todo => todo.completed = event.target.checked);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
  },
  computed: {
    remainig() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemainig() {
      return this.remainig !== 0;
    },
    todosFiltered() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.completed);
        case 'completed':
          return this.todos.filter(todo => todo.completed);
        default:
          return this.todos;
      }
    },
    showClearCompleatedButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    },
  },


};
</script>

<style lang="scss">
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css");

    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus {
            outline: 0;
        }
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;

        &:hover {
            color: black;
        }
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }

    .completed {
        text-decoration: line-through;
        color: gray;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgray;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
        outline: none;
        border: 1px solid black;
        margin-right: 5px;

        &:hover {
            background-color: lightgreen;
        }

        &:focus {
            outline: none;
        }
    }

    .active {
        background-color: lightgreen;
    }

</style>
