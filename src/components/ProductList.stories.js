import ProductList from './ProductList.vue'

export default {
  component: ProductList,
  title: 'ProductList',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {}
}

export const Default = {}
