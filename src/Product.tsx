import { useContext, useEffect } from 'react'

import { Product, ProductContext } from './App'
import Image from './Image'
import { fetchProduct } from './api'
import { useParams } from 'react-router-dom'
import ProductOptionComponent from './ProductOption'

export default function ProductComponent() {
  const { selectProduct, selectedProduct, selectedOption } = useContext(ProductContext)
  const { id } = useParams();

  const product = (selectedProduct as Product);

  useEffect(() => {
    (async function call() {
      if (id && id !== `${product.id}`) selectProduct(await fetchProduct(parseInt(id)))
    })()
  }, [id, selectProduct, product])

  if (Object.keys(product).length === 0 && product.constructor === Object) {
    return <></>
  }

  return (
    <section className="flex justify-between sm:p-18 md:p-15 lg:p-20">
      <div className='w-2/5'>
        <Image className="aspect-square bg-center bg-cover bg-no-repeat mb-5" image={selectedOption.image} />
      </div>
      <div className='w-2/5'>
        <h2 className="text-2xl font-bold mb-5">{product.title}</h2>
        <h3 className="text-xl mb-10">${product.price}</h3>
        <ProductOptionComponent />
      </div>
    </section>
  )
}