import { Product } from './App'

type Props = {
  product: Product
}

export default function ProductComponent({ product }: Props) {

  if (Object.keys(product).length === 0 && product.constructor === Object) {
    return <></>
  }

  return (
    <section>
      <h2>{product.title}</h2>
    </section>
  )
}