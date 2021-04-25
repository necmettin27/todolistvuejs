<template>
  <div class="col-md-12"><label><input type="checkbox" :checked="!anyRemaining" @change="allChecked"> Tümünü Seç</label></div>
</template>

<script>
export default {
  name: 'todo-check-all',
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    }
  },
  methods: {
    allChecked() {
      this.$store.dispatch('checkAll', event.target.checked)
    }
  }
}
</script>