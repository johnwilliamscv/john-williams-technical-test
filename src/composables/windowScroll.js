import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useWindowScroll() {
  const x = ref(0)
  const y = ref(0)

  // Pixel count between current Y scroll position and bottom of scroll bar
  const scrollRemaining = computed(() => document.body.scrollHeight - y.value - window.innerHeight)

  function update() {
    x.value = parseInt(window.scrollX)
    y.value = parseInt(window.scrollY)
  }

  onMounted(() => window.addEventListener('scroll', update))
  onUnmounted(() => window.removeEventListener('scroll', update))

  return { x, y, scrollRemaining }
}
