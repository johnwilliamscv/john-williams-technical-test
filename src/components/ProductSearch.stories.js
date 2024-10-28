import ProductSearch from './ProductSearch.vue'

export default {
  component: ProductSearch,
  title: 'ProductSearch',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {}
}

export const Default = {}
