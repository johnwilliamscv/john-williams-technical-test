<template>
  <div v-if="store.purchaseCountdown" class="overlay">
    <div class="box">
      <h2 style="margin-top: 0">Thank you for making your purchase!</h2>
      <table>
        <tr v-for="(row, idx) in tableRows" :key="idx" :style="row.total ? 'font-weight:bold' : ''">
          <td>{{ row.total ? `TOTAL:` : `${row.quantity} x ${row.description}:` }}</td>
          <td style="padding-left: 1rem">&pound;</td>
          <td style="text-align: right">{{ row.price || row.total }}</td>
        </tr>
      </table>
      <div>
        <button @click="store.resetProductPage">
          Returning to product page in {{ store.purchaseCountdown }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../store'
import { computed } from 'vue'

const store = useProductStore()
const tableRows = computed(() =>
  store.basket.concat({
    total: store.basketCost // Append total row to basket items
  })
)
</script>

<style scoped>
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  border: 5px solid black;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
}
button {
  background-color: #182e2a;
  color: white;
  border-radius: 15px;
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  border: none;
  margin-top: 2rem;
  cursor: pointer;
}
</style>
