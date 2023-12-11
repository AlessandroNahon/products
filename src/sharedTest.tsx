import { Size, routes } from './App'
import { mockOptions } from './api'

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProductOption } from './components';

export const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/products"],
  initialIndex: 0,
});

export const testQueryCache = new QueryCache();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: testQueryCache,
});

function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export const wrapper = Wrapper

export const content = () => <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
</QueryClientProvider>

export const mockBaseProps = {
  selectedSize: '' as Size,
  selectedOption: {
    label: mockOptions[0].label,
    image: mockOptions[0].image,
    availableSizes: mockOptions[0].availableSizes,
  },
  setSelectedOption: jest.fn(),
  setSelectedSize: jest.fn(),
};

export const productOptionContent = <QueryClientProvider client={queryClient}>
  <ProductOption {...mockBaseProps} />
</QueryClientProvider>