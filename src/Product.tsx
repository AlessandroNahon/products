import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Product, ProductOption, Size } from './App'
import Image from './Image'
import { fetchProduct, mockOptions } from './api'
import { useParams } from 'react-router-dom'
import ProductOptionComponent from './ProductOption'

export default function ProductComponent() {
  const [selectedOption, setSelectedOption] = useState<ProductOption>(mockOptions[0])
  const [selectedSize, setSelectedSize] = useState<Size>('')

  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['product', id], queryFn: async () => await fetchProduct(id) })
  const product = (data as Product);

  if (isLoading) {
    return <div>...Loading</div>
  }

  return (
    <section className="flex justify-between sm:p-18 md:p-15 lg:p-20">
      <div className='w-2/5'>
        <Image className="aspect-square bg-center bg-cover bg-no-repeat mb-5" image={selectedOption.image} />
      </div>
      <div className='w-2/5'>
        <h2 className="text-2xl font-bold mb-5">{product.title}</h2>
        <h3 className="text-xl mb-10">${product.price}</h3>
        <ProductOptionComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
      </div>
    </section>
  )
}