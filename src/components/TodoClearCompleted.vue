<template>
    <button v-if="showClearCompleatedButton"
            @click="clearCompleted"
    >Clear completed
    </button>
</template>

<script>
export default {
  name: 'TodoClearCompleted',
  props: {
    showClearCompleatedButton: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clearCompleted() {
      eventBus.$emit('clearCompletedTodos');
    },
  },
};
</script>

<style scoped>

</style>
