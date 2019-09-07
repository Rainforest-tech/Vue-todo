<template>
    <div>{{remaining}} items left</div>
</template>

<script>
export default {
  name: 'TodoItemsRemainig',
  props: {
    remaining: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
