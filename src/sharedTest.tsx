import { routes } from './App'
import { products } from './testData'
import { mockOptions } from './api'

import { createMemoryRouter } from 'react-router-dom';

const selectProduct = jest.fn()
const selectOption = jest.fn()
const selectSize = jest.fn()

export const selectedProductState = {
  products,
  selectProduct,
  selectedProduct: products[0],
  selectOption,
  selectedOption: mockOptions[0],
  selectSize,
  selectedSize: mockOptions[0].availableSizes[0],
}

export const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/products"],
  initialIndex: 1,
});