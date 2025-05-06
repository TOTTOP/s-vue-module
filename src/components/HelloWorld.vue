<script setup>
import floatButton from './floatButton/index.vue'
import mergeTable from './mergeTable/index.vue'
import { ref } from 'vue'

const iconMsg = ref({
  iconImg: '',
  iconText: '按钮',
})

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <float-button :iconMsg="iconMsg"></float-button>
  <merge-table></merge-table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
