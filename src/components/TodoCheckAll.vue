<template>
    <div>
        <label>
            <input type="checkbox" :checked="!anyRemainig"
                   @change="allChecked">
            Check All
        </label>
    </div>
</template>

<script>
export default {
  name: 'TodoCheckAll',
  computed: {
    anyRemainig() {
      return this.$store.getters.anyRemainig;
    },
  },
  methods: {
    allChecked() {
      // eslint-disable-next-line no-return-assign,no-restricted-globals
      this.$store.dispatch('checkAll', event.target.checked);
    },
  },
};
</script>

<style scoped>

</style>
