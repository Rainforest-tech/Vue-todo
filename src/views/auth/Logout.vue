<template><div></div></template>
<script>
export default {
  name: 'Logout',
  created() {
    this.$store.dispatch('destroyToken');
  },
};
</script>
