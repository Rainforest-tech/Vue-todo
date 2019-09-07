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
  props: {
    anyRemainig: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    allChecked() {
      eventBus.$emit('checkAllChanged', this.anyRemainig);
    },
  },
};
</script>

<style scoped>

</style>
