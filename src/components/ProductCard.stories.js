import { fn } from '@storybook/test'

import ProductCard from './ProductCard.vue'

export const ActionsData = {
  onAdd: fn()
}

export default {
  component: ProductCard,
  title: 'ProductCard',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData
  }
}

export const Default = {
  args: {
    product: {
      id: '1',
      name: 'Product 1',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
      price: '1.48',
      description: 'Description for product 1',
      category: 'Category 1',
      quantity: 0
    }
  }
}

export const Added = {
  args: {
    product: {
      ...Default.args.product,
      quantity: 1
    }
  }
}
