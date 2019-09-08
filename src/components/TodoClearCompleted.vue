<template>
    <button v-if="showClearCompleatedButton"
            @click="clearCompleted"
    >Clear completed
    </button>
</template>

<script>
export default {
  name: 'TodoClearCompleted',
  computed: {
    showClearCompleatedButton() {
      return this.$store.getters.showClearCompleatedButton;
    },
  },
  methods: {
    clearCompleted() {
      this.$store.commit('clearCompleted');
    },
  },
};
</script>

<style scoped>

</style>
