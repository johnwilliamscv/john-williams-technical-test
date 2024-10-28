<template>
  <div class="filter">
    <button
      v-for="category in store.categories"
      :key="category"
      :class="getClass(category)"
      :aria-label="`Filter by ${category}`"
      @click="store.filter(category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup>
import { useProductStore } from '@/store'
const store = useProductStore()
const getClass = (category) => {
  return store.selectedCategories.includes(category) ? 'selected' : ''
}
</script>

<style scoped>
.filter {
  padding: 1rem;
}
button {
  background-color: transparent;
  color: #182e2a;
  border-radius: 50px;
  padding: 0.75rem 1rem;
  font-weight: bold;
  border: 3px solid #00000040;
  margin: 0.25rem;
  cursor: pointer;
  white-space: nowrap;
}
.selected {
  background-color: #182e2a;
  color: white;
}
</style>
