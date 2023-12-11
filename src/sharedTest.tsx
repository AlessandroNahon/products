import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { mockOptions } from './api'

import { ProductOption } from './components';
import { Size, routes, queryClient } from './App'
import { Product } from './views';

export const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/products"],
  initialIndex: 0,
});

export const wrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export const mockProductOptionProps = {
  selectedSize: '' as Size,
  selectedOption: {
    label: mockOptions[0].label,
    image: mockOptions[0].image,
    availableSizes: mockOptions[0].availableSizes,
  },
  setSelectedOption: jest.fn(),
  setSelectedSize: jest.fn(),
};

export const productContent = () => <QueryClientProvider client={queryClient}>
  <Product />
</QueryClientProvider>

export const productOptionContent = <QueryClientProvider client={queryClient}>
  <ProductOption {...mockProductOptionProps} />
</QueryClientProvider>

