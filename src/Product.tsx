import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Product as ProductType, ProductOption as ProductOptionType, Size } from './App'
import Image from './Image'
import { fetchProduct, mockOptions } from './api'
import { useParams } from 'react-router-dom'
import ProductOption from './ProductOption'

export default function Product() {
  const [selectedOption, setSelectedOption] = useState<ProductOptionType>(mockOptions[0])
  const [selectedSize, setSelectedSize] = useState<Size>('')

  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['product', id], queryFn: async () => await fetchProduct(id) })
  const product = (data as ProductType);

  if (isLoading) {
    return <ProductLoading />
  }

  return (
    <section className="flex justify-between sm:p-18 md:p-15 lg:p-20">
      <div className='w-2/5'>
        <Image className="aspect-square bg-center bg-cover bg-no-repeat mb-5" image={selectedOption.image} />
      </div>
      <div className='w-2/5'>
        <h2 className="text-2xl font-bold mb-5">{product.title}</h2>
        <h3 className="text-xl mb-10">${product.price}</h3>
        <ProductOption selectedOption={selectedOption} setSelectedOption={setSelectedOption} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      </div>
    </section>
  )
}

function ProductLoading() {
  return (
    <section className="flex justify-between sm:p-18 md:p-15 lg:p-20">
      <div className='w-2/5'>
        <div className="flex items-center justify-center w-2/5 h-48 bg-gray-100 rounded sm:w-96 dark:bg-gray-400">
          <svg className="w-10 h-10 text-gray-100 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      <div className="w-2/5">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[360px]"></div>
      </div>
    </section>
  )
}