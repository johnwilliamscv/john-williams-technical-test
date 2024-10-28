<template>
  <div class="product" :aria-label="product.description">
    <img :src="product.image" style="max-width: 100%" :alt="product.description" />
    <div class="description">{{ product.description }}</div>
    <div class="category">{{ product.category }}</div>
    <div class="price">&pound; {{ product.price }}</div>
    <button
      class="add"
      @click="() => emit('add')"
      :aria-label="`Add ${product.description}`"
      :disabled="product.quantity > 0"
    >
      <img src="@/assets/basket.svg" alt="" /><span>
        {{ product.quantity ? 'Added to basket!' : 'Add' }}
      </span>
    </button>
    <div v-if="product.quantity" class="overlay">
      <button
        @click="() => store.removeFromBasket(product.id)"
        :aria-label="`Remove ${product.description}`"
      >
        &minus;
      </button>
      <div class="quantity">{{ product.quantity }}</div>
      <button
        @click="() => store.addToBasket(product.id)"
        :aria-label="`Add ${product.description}`"
      >
        &plus;
      </button>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../store'
const store = useProductStore()
const emit = defineEmits(['add'])

defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      description: '',
      category: '',
      image: '',
      price: '',
      quantity: 0
    }),
    validator: (product) =>
      ['id', 'name', 'description', 'category', 'image', 'price', 'quantity'].every(
        (key) => key in product
      )
  }
})
</script>

<style scoped>
.product {
  text-align: center;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 0px 20px 0px #5c5c5c40;
  padding: 1rem;
  line-height: 1.5;
  background-color: white;
  position: relative; /* Necessary for overlay */
}

.description,
.price {
  font-weight: bold;
}

.add {
  background-color: #182e2a;
  color: white;
  border-radius: 15px;
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  border: none;
  margin-top: 0.5rem;
  cursor: pointer;

  /* Center button icon & label */
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
}
.add img {
  width: 1em;
}

.overlay {
  /* Green overlay covering product card with centered content */
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #69d77dc3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.overlay button {
  /* Create round buttons for quantity adjustment */
  background-color: white;
  color: black;
  border-radius: 50px;
  padding: 0;
  border: none;
  cursor: pointer;
  width: 1em;
  height: 1em;
  line-height: 1;
  font-size: 40px;
  overflow: hidden;
}

.quantity {
  font-size: 40px;
  color: white;
  display: inline-block;
  width: 2em;
}
</style>
