<template>
    <div class="todo-item">
        <div class="todo-item">
            <input type="checkbox" v-model="completed" @change="editTodo">
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

        <div class="remove-item" @click="removeTodo(index)">
            &times;
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
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
  },
  methods: {
    removeTodo(index) {
      this.$emit('removedTodo', index);
    },
    editTodo() {
      // eslint-disable-next-line no-param-reassign
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache;
      }
      this.beforeEditCache = this.title;
      this.editing = !this.editing;
      this.$emit('finishedEdit', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
        },
      });
    },
    cancelEdit() {
      this.editing = !this.editing;
      this.title = this.beforeEditCache;
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
