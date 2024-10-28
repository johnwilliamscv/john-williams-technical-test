import ProductFilter from './ProductFilter.vue'

export default {
  component: ProductFilter,
  title: 'ProductFilter',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {}
}

export const Default = {}
