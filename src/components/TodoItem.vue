<template>
    <div class="todo-item" v-if="todo">
        <div class="todo-item">
            <input type="checkbox" v-model="completed" @change="finishEdit">
            <input v-if="editing"
                   class="todo-item-edit"
                   type="text" v-model="title"
                   @blur="finishEdit"
                   @keyup.enter="finishEdit"
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
            <div class="remove-item" @click="removeTodo(id)">
                &times;
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    // todo: {
    //   type: Object,
    //   required: true,
    // },
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
      id: '',
      title: '',
      completed: false,
      editing: false,
      beforeEditCahce: '',
    };
  },
  created() {
    eventBus.$on('pluralize', this.handlePluralize);
    this.todo = this.$store.getters.todo(this.index);
    this.id = this.todo.id;
    this.title = this.todo.title;
    this.completed = this.todo.completed;
  },
  beforeDestroy() {
    eventBus.$off('pluralize', this.handlePluralize);
  },
  watch: {
    checkAll() {
      // eslint-disable-next-line no-return-assign
      return this.completed = this.checkAll ? true : this.todo.completed;
    },
    completed() {
      return this.todo.completed;
    },
    todo() {
      return this.$store.getters.todo(this.index);
    },
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch('deleteTodo', id);
    },
    finishEdit() {
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache;
        return;
      }
      this.$store.dispatch('updateTodo', {
        id: this.id,
        title: this.title,
        completed: this.completed,
      });
      this.editing = false;
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = !this.editing;
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
