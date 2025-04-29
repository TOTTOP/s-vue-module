<script setup>
import mergeTable from './mergeTable/index.vue'
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <merge-table></merge-table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
