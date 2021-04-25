<template>
  <button v-if="showClearCompletedButton" class="btn btn-danger btn-sm" @click="clearCompleted">Seçilenleri Sil</button>
</template>

<script>
export default {
  name: 'todo-clear-completed',
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>

