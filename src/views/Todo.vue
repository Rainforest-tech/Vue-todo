<template>
    <div class="container">
        <img alt="Vue logo" src="../assets/logo.png" class="logo">
        <todo-list/>
    </div>
</template>

<script>
import TodoList from '../components/TodoList.vue';

export default {
  name: 'app',
  components: {
    TodoList,
  },
};
</script>
