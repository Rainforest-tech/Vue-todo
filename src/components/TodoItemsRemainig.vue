<template>
    <div>{{remaining}} items left</div>
</template>

<script>
export default {
  name: 'TodoItemsRemainig',
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
  },
};
</script>

<style scoped>

</style>
