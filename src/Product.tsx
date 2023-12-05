import { useContext, useEffect } from 'react'

import { Product, ProductContext } from './App'
import Image from './Image'
import { fetchProduct } from './api'
import { useParams } from 'react-router-dom'

export default function ProductComponent() {
  const { selectProduct, selectedProduct } = useContext(ProductContext)
  const { id } = useParams();

  useEffect(() => {
    (async function call() {
      if (id) selectProduct(await fetchProduct(parseInt(id)))
    })()
  }, [id, selectProduct])

  if (Object.keys(selectedProduct).length === 0 && selectedProduct.constructor === Object) {
    return <></>
  }

  const product = (selectedProduct as Product);

  return (
    <section className="sm:p-18 md:p-15 lg:p-20">
      <Image className="max-h-80 aspect-video bg-center bg-contain bg-no-repeat mb-5" image={product.image} />
      <h2 className="text-3xl font-bold">{product.title}</h2>
    </section>
  )
}