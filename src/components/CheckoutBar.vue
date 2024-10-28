<template>
  <div class="bar">
    <div>
      <button class="clear" :disabled="!store.basket.length" @click="store.clearBasket">
        Clear basket
      </button>
    </div>
    <div>
      <button
        class="checkout"
        :disabled="!store.basket.length"
        :aria-label="`Purchase ${store.basketQuantity} item(s)`"
        @click="store.checkout"
      >
        <div>
          <img class="basket-icon" src="@/assets/basket.svg" alt="" />
        </div>
        <div style="text-align: left">
          <div>Purchase</div>
          <div class="quantity">
            {{ store.basketQuantity }} item{{ store.basketQuantity !== 1 ? 's' : '' }}
          </div>
        </div>
        <div class="total">&pound; {{ store.basketCost }}</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../store'
const store = useProductStore()
</script>

<style>
/* 
  As the checkout bar floats over page content, add extra padding to the 
  bottom of the page (as a global style) to ensure checkout bar does not 
  cover any page content when fully scrolled to the bottom of the page.
*/
#app {
  padding-bottom: 5em;
}
</style>

<style scoped>
.bar {
  background-color: white;
  padding: 1rem;
  display: flex;
  column-gap: 1em;
  align-items: center;
  justify-content: right;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  box-shadow: 0 0px 2rem rgba(0, 0, 0, 0.25);
}

.checkout {
  background-color: green;
  border: 5px solid green;
  color: white;
  border-radius: 3rem;
  font-size: 1rem;
  padding: 0;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  overflow: hidden;
}

.total {
  background-color: white;
  color: black;
  padding: 1rem;
  font-size: 4vw;
}
@media screen and (min-width: 800px) {
  .total {
    font-size: 32px;
    min-width: 5em;
  }
}

.quantity {
  font-weight: 300;
}

.basket-icon {
  width: 40px;
  padding-left: 1rem;
}

.clear {
  background-color: rgb(219, 219, 219);
  border-radius: 4rem;
  font-size: 1rem;
  border: 0;
  cursor: pointer;
  padding: 1.8rem;
}

.checkout:disabled,
.clear:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

img {
  width: 1.5em;
}
</style>
