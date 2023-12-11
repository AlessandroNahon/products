import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { mockOptions } from './api'

import { Size, queryClient, routes } from './App'
import { ProductOption } from './components'

export const mockProductOptionProps = {
	selectedSize: '' as Size,
	selectedOption: {
		label: mockOptions[0].label,
		image: mockOptions[0].image,
		availableSizes: mockOptions[0].availableSizes,
	},
	setSelectedOption: jest.fn(),
	setSelectedSize: jest.fn(),
}

export const router = createMemoryRouter(routes, {
	initialEntries: ['/', '/products'],
	initialIndex: 0,
})

export const wrapper = (
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
)

export const productOptionContent = (
	<QueryClientProvider client={queryClient}>
		<ProductOption {...mockProductOptionProps} />
	</QueryClientProvider>
)
