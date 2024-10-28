<template>
  <div class="controls">
    <ProductFilter style="flex: 1" />
    <ProductSearch />
  </div>
  <div class="products">
    <ProductCard
      v-for="p in store.products"
      :key="p.id"
      :product="p"
      @add="store.addToBasket(p.id)"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import ProductFilter from './ProductFilter.vue'
import ProductSearch from './ProductSearch.vue'
import { useWindowScroll } from '@/composables/windowScroll'
import { watch } from 'vue'
import { useProductStore } from '../store'

const store = useProductStore()
const { scrollRemaining } = useWindowScroll()
const triggerZone = 100

watch(scrollRemaining, () => {
  if (scrollRemaining.value < triggerZone) {
    store.showMore()
  }
})
</script>

<style scoped>
.products {
  padding: 32px;
  display: grid;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
}
@media screen and (min-width: 800px) {
  .products {
    grid-template-columns: repeat(3, 1fr);
  }
  .controls {
    display: flex;
    align-items: start;
  }
}
</style>
