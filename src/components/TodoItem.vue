<template>
    <div class="todo-item">
        <div class="todo-item">
            <input type="checkbox" v-model="completed" @change="finishEdit">
            <input v-if="editing"
                   class="todo-item-edit"
                   type="text" v-model="title"
                   @blur="editTodo"
                   @keyup.enter="editTodo"
                   @keyup.esc="cancelEdit"
                   v-focus
            >
            <div v-else class="todo-item-label"
                 :class="{completed: completed}"
                 @dblclick="editTodo">
                {{title}}
            </div>
        </div>
        <div class="extra-container">
            <div>
                <button @click="pluralize">Plural</button>
            </div>
            <div class="remove-item" @click="removeTodo(index)">
                &times;
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCahce: '',
    };
  },
  created() {
    eventBus.$on('pluralize', this.handlePluralize);
  },
  beforeDestroy() {
    eventBus.$off('pluralize', this.handlePluralize);
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
  },
  methods: {
    removeTodo(index) {
      eventBus.$emit('removedTodo', index);
    },
    finishEdit() {
      eventBus.$emit('finishedTodo', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
        },
      });
    },
    editTodo() {
      // eslint-disable-next-line no-param-reassign
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache;
      }
      this.beforeEditCache = this.title;
      this.editing = !this.editing;
      this.finishEdit();
    },
    cancelEdit() {
      this.editing = !this.editing;
      this.title = this.beforeEditCache;
    },
    pluralize() {
      eventBus.$emit('pluralize');
    },
    handlePluralize() {
      this.title = `${this.title}s`;
      this.finishEdit();
    },
  },
  directives: {
    focus: {
      inserted: el => el.focus(),
    },
  },
};
</script>

<style scoped>

</style>
