import { useState } from 'react'

import { mockOptions } from '../api'
import { useFetchProduct } from '../hooks'

import { ProductOption as ProductOptionType, Size } from '../App'
import { Image, ProductOption } from '../components'

export default function Product() {
	const [selectedOption, setSelectedOption] = useState<ProductOptionType>(
		mockOptions[0]
	)
	const [selectedSize, setSelectedSize] = useState<Size>('')

	const { data } = useFetchProduct()

	return (
		<section
			data-testid='product-section'
			className='flex justify-between sm:p-18 md:p-15 lg:p-20'
		>
			<div className='w-2/5'>
				<Image
					className='aspect-square bg-center bg-cover bg-no-repeat mb-5'
					image={selectedOption.image}
				/>
			</div>
			<div className='w-2/5'>
				<h2 className='text-2xl font-bold mb-5'>{data.title}</h2>
				<h3 className='text-xl mb-10'>${data.price}</h3>
				<ProductOption
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					selectedSize={selectedSize}
					setSelectedSize={setSelectedSize}
				/>
			</div>
		</section>
	)
}
