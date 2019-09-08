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
                       :checkAll="!anyRemainig">

            </todo-item>
        </transition-group>
        <div class="extra-container">
            <todo-check-all/>
            <todo-items-remainig/>
        </div>
        <div class="extra-container">
            <todo-filter/>
            <div>
                <transition appear mode="in-out"
                            enter-active-class="animate fadeInUp"
                            leave-active-class="animate flipOutY">
    <todo-clear-completed/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
import TodoItemsRemainig from './TodoItemsRemainig.vue';
import TodoCheckAll from './TodoCheckAll.vue';
import TodoFilter from './TodoFilter.vue';
import TodoClearCompleted from './TodoClearCompleted.vue';

export default {
  name: 'TodoList',
  components: {
    TodoClearCompleted,
    TodoFilter,
    TodoCheckAll,
    TodoItemsRemainig,
    TodoItem,
  },
  data() {
    return {
      newTodo: '',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.$store.dispatch('addTodo', {
        title: this.newTodo,
        completed: false,
      });

      this.newTodo = '';
    },
  },
  created() {
    this.$store.dispatch('retrieveTodos');
  },
  computed: {
    anyRemainig() {
      return this.$store.getters.anyRemainig;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
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
