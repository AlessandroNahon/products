import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Error, ProductLoading } from './components'
import {
	Product as ProductComponent,
	Products as ProductsComponent,
} from './views'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | ''

export type ProductOption = {
	label: string
	image: string
	availableSizes: Size[]
}

export type Product = {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: {
		count: number
		rate: number
	}
	rate?: number
	count?: number
	options?: ProductOption[]
}

export const routes = [
	{
		path: '/',
		element: <Navigate to='/products' replace />,
	},
	{
		path: '/products',
		element: (
			<Error>
				<ProductsComponent />
			</Error>
		),
	},
	{
		path: '/product/:id',
		element: (
			<Suspense fallback={<ProductLoading />}>
				<ProductComponent />
			</Suspense>
		),
	},
]
const router = createBrowserRouter(routes)
export const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<main>
				<RouterProvider router={router} />
			</main>
		</QueryClientProvider>
	)
}

export default App
