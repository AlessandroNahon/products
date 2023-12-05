import { Product } from './App'

const GET_PRODUCTS = 'https://fakestoreapi.com/products'
const GET_PRODUCT = 'https://fakestoreapi.com/products/:id'

function swapIdParam(url: string, id: number): URL | RequestInfo | null {
	try {
		const urlObject = new URL(url)
		const pathname = urlObject.pathname
		const newPathname = pathname.replace(/:id/, `${id}`)

		urlObject.pathname = newPathname

		const modifiedUrl = urlObject.toString()

		return modifiedUrl
	} catch (error) {
		console.error('Error replacing ID in URL:', error)
		return null
	}
}

export async function fetchProducts(): Promise<Product[]> {
	const res = await fetch(GET_PRODUCTS)
	return await res.json()
}

export async function fetchProduct(id: number): Promise<Product | {}> {
	const url = swapIdParam(GET_PRODUCT, id)
	if (!url) {
		return {}
	}
	const res = await fetch(url)
	return await res.json()
}
