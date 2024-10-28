<template>
  <div>
    <input v-model="modelValue" aria-label="Search products" placeholder="Search..." />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/store'
const store = useProductStore()
const modelValue = computed({
  get() {
    return store.getSearch()
  },
  set(v) {
    store.setSearch(v)
  }
})
</script>

<style scoped>
input {
  border: 3px solid #182e2a;
  background-color: white;
  color: black;
  border-radius: 50px;
  padding: 0.75rem 0.75rem 0.75rem 3rem;
  margin: 1.25rem;
  background-image: url(src/assets/search.png);
  background-size: 1.5rem;
  background-position: 8px center;
  background-repeat: no-repeat;
}
.selected {
  background-color: #182e2a;
  color: white;
}
</style>
