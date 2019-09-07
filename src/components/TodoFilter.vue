<template>
    <div>
        <button :class="{active: filter ==='all'}"
                @click="changeFilter('all')">All
        </button>
        <button :class="{active: filter ==='active'}"
                @click="filter=changeFilter('active')">Active
        </button>
        <button :class="{active: filter ==='completed'}"
                @click="filter=changeFilter('completed')">Completed
        </button>
    </div>
</template>

<script>
export default {
  name: 'TodoFilter',

  data() {
    return {
      filter: 'all',
    };
  },
  methods: {
    changeFilter(filter) {
      this.filter = filter;
      eventBus.$emit('filterChanged', this.filter);
    },
  },
};
</script>

<style scoped>

</style>
