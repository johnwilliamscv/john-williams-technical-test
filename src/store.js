import { computed, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'

/*
 * The initial state of our store when the app loads.
 * Usually, you would fetch this from a server. Let's not worry about that now
 */
const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' }
]

/*
 * The store is created here.
 * You can read more about Pinia defineStore in the docs:
 * https://pinia.vuejs.org/core-concepts/
 */
export const useTaskStore = defineStore({
  id: 'taskbox',
  state: () => ({
    tasks: defaultTasks,
    status: 'idle',
    error: null
  }),
  actions: {
    archiveTask(id) {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.state = 'TASK_ARCHIVED'
      }
    },
    pinTask(id) {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.state = 'TASK_PINNED'
      }
    }
  },
  getters: {
    getFilteredTasks: (state) => {
      const filteredTasks = state.tasks.filter(
        (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
      )
      return filteredTasks
    }
  }
})

async function fetchUrl(url) {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error('COULD NOT LOAD PRODUCTS. IS LOCAL SERVER IS RUNNING?', error)
    return [
      {
        id: '1',
        name: 'Error',
        image: 'https://cdn.pixabay.com/photo/2021/09/05/17/28/system-error-6600040_1280.png',
        price: '0.00',
        description: '[PRODUCTS COULD NOT BE LOADED]',
        category: 'Category 1'
      }
    ]
  }
}

export const useProductStore = defineStore('product', () => {
  /* defaultPageSize:
      Needs to be enough content for at least 2 pages, even on the largest screens.
      This will ensure vertical scrollbars are present, allowing endless scroll to work. */
  const defaultPageSize = 18

  const state = reactive({
    allProducts: [],
    visibleItemCount: defaultPageSize,
    selectedCategories: [],
    search: '',
    purchaseCountdown: 0 // 60sec countdown after purchase before resetting product page
  })

  // Fetch data from API
  onMounted(async () => {
    state.allProducts = await fetchUrl('http://localhost:3000/products')
    state.allProducts.map((p) => (p.quantity = 0))
  })

  // Unique, sorted categories from product data
  const categories = computed(() =>
    [...new Set(state.allProducts.map((p) => p.category))].sort((a, b) => a.localeCompare(b))
  )

  // Basket items (i.e. products with a quantity set)
  const basket = computed(() => state.allProducts.filter((p) => p.quantity))

  // Visible products
  const products = computed(() =>
    state.allProducts
      .filter((p) => {
        const isCategoryMatch =
          !state.selectedCategories.length || state.selectedCategories.includes(p.category)
        const isSearchMatch =
          !state.search || p.description.toLowerCase().indexOf(state.search.toLowerCase()) >= 0
        return isCategoryMatch && isSearchMatch
      })
      .filter((p, idx) => idx < state.visibleItemCount)
  )

  // Total quantity of basket items
  const basketQuantity = computed(() =>
    basket.value.reduce((total, value) => total + value.quantity, 0)
  )

  // Total cost of basket items as a 2dp string, e.g. "3.50"
  const basketCost = computed(() =>
    basket.value
      .reduce((total, value) => total + value.quantity * Number(value.price), 0)
      .toFixed(2)
  )

  const purchaseCountdown = computed(() => state.purchaseCountdown)

  function resetEndlessScroll() {
    state.visibleItemCount = defaultPageSize
  }

  function showMore() {
    state.visibleItemCount += defaultPageSize
  }

  function filter(category) {
    resetEndlessScroll()
    const idx = state.selectedCategories.indexOf(category)
    if (idx === -1) {
      state.selectedCategories.push(category)
    } else {
      state.selectedCategories.splice(idx, 1)
    }
  }

  function getSearch() {
    return state.search
  }

  function setSearch(val) {
    resetEndlessScroll()
    state.search = val
  }

  function addToBasket(id) {
    const product = state.allProducts.find((p) => p.id === id)
    product.quantity++
  }

  function removeFromBasket(id) {
    const product = state.allProducts.find((p) => p.id === id)
    product.quantity--
  }

  function clearBasket() {
    state.allProducts.map((p) => {
      if (p.quantity) {
        p.quantity = 0
      }
    })
  }

  function resetProductPage() {
    window.scrollTo(0, 0)
    state.purchaseCountdown = 0
    clearBasket()
    resetEndlessScroll()
    state.search = ''
    state.selectedCategories.splice(0)
  }

  function checkout() {
    if (basketQuantity.value > 20) {
      alert('Only 20 items can be purchased at a time. Please reduce your basket.')
    } else {
      state.purchaseCountdown = 60
      const interval = setInterval(() => {
        if (state.purchaseCountdown) {
          state.purchaseCountdown--
        }
        if (!state.purchaseCountdown) {
          clearInterval(interval)
          resetProductPage()
        }
      }, 1000)
    }
  }

  return {
    products,
    categories,
    selectedCategories: state.selectedCategories,
    basket,
    basketQuantity,
    basketCost,
    purchaseCountdown,
    showMore,
    filter,
    getSearch,
    setSearch,
    addToBasket,
    removeFromBasket,
    clearBasket,
    checkout,
    resetProductPage
  }
})
