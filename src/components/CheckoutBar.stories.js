import CheckoutBar from './CheckoutBar.vue'

export default {
  component: CheckoutBar,
  title: 'CheckoutBar',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {}
}

export const Default = {}
