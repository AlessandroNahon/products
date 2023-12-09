import { Product, ProductOption } from './App'

const GET_PRODUCTS = 'https://fakestoreapi.com/products'
const GET_PRODUCT = 'https://fakestoreapi.com/products/:id'

export async function fetchProducts(): Promise<Product[]> {
	const res = await fetch(GET_PRODUCTS)
	return await res.json()
}

export async function fetchProduct(
	id: string | undefined
): Promise<Product | {}> {
	if (!id) {
		return {}
	}

	const url = swapIdParam(GET_PRODUCT, parseInt(id))
	if (!url) {
		return {}
	}
	const res = await fetch(url)
	return await res.json()
}

function swapIdParam(url: string, id: number): URL | RequestInfo | null {
	try {
		const urlObject = new URL(url)

		urlObject.pathname = urlObject.pathname.replace(/:id/, `${id}`)

		const modifiedUrl = urlObject.toString()

		return modifiedUrl
	} catch (error) {
		console.error('Error replacing ID in URL:', error)
		return null
	}
}

const mockOption1: ProductOption = {
	label: 'white',
	image:
		'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F88%2Fad%2F88ad8559dc5e3aa767ef6ba692a6c7ed6dfe16e2.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
	availableSizes: ['xs', 'lg', 'xl'],
}

const mockOption2: ProductOption = {
	label: 'black',
	image:
		'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F56%2F54%2F56544c69635cc0c4bfaf097226b7f1021a83a09d.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
	availableSizes: ['xs', 'sm', 'xl'],
}

const mockOption3: ProductOption = {
	label: 'light turquoise',
	image:
		'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F32%2Fc0%2F32c0dcfd2756a25e315bd38fef194d79f23e0307.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]',
	availableSizes: ['xs', 'sm', 'md', 'lg', 'xl'],
}

const mockOption4: ProductOption = {
	label: 'green/white striped',
	image:
		'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F01%2F7a%2F017acd79328acba6384e01bff1f802633a6b3171.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
	availableSizes: ['xs', 'xl'],
}

const mockOption5: ProductOption = {
	label: 'beige',
	image:
		'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fb0%2Fa6%2Fb0a6a7e9fd5029d07904e5c1b499eede16acea40.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
	availableSizes: ['xs', 'sm', 'xl'],
}

const mockOption6: ProductOption = {
	label: 'pale green',
	image:
		'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fbe%2F4e%2Fbe4e6456f45e0b796b0f8238a3a5276e879022b0.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
	availableSizes: ['xs', 'sm', 'md', 'lg', 'xl'],
}

export const mockOptions: ProductOption[] = [
	mockOption1,
	mockOption2,
	mockOption3,
	mockOption4,
	mockOption5,
	mockOption6,
]
