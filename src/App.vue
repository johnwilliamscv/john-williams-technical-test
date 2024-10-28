<script setup>
import ProductList from './components/ProductList.vue'
import CheckoutBar from './components/CheckoutBar.vue'
import PurchaseConfirmation from './components/PurchaseConfirmation.vue'
</script>

<template>
  <div class="layout">
    <img class="banner" src="@/assets/Headers.png" aria-label="Coca-cola bottle" />
    <ProductList />
    <CheckoutBar />
    <PurchaseConfirmation />
  </div>
</template>

<style scoped>
.banner {
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  object-position: top;
}
</style>
