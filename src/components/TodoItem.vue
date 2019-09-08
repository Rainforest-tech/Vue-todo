<template>
    <div class="todo-item">
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
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: false,
      beforeEditCahce: '',
    };
  },
  computed: {
    checkAll() {
      return this.$store.getters.checkAll;
    },
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
    removeTodo(id) {
      this.$store.dispatch('deleteTodo', id);
    },
    finishEdit() {
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache;
        return;
      }
      this.$store.commit('updateTodo', {
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
