<template>
  <div>
    <button class="btn btn-sm" :class="{ 'btn-success': filter == 'all' }" @click="changeFilter('all')">Tümü</button>
    <button class="btn btn-sm" :class="{ 'btn-success': filter == 'active' }" @click="changeFilter('active')">Yapılacaklar</button>
    <button class="btn btn-sm" :class="{ 'btn-success': filter == 'completed' }" @click="changeFilter('completed')">Yapılanlar</button>
  </div>
</template>

<script>
export default {
  name: 'todo-filtered',
  computed: {
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch('updateFilter', filter)
    }
  }
}
</script>

