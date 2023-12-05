import { Product } from './App'
import Image from './Image'

type Props = {
  product: Product
}

export default function ProductComponent({ product }: Props) {

  if (Object.keys(product).length === 0 && product.constructor === Object) {
    return <></>
  }

  return (
    <section>
      <Image className="max-h-80 aspect-video bg-center bg-contain bg-no-repeat mb-5" image={product.image} />
      <h2 className="text-3xl font-bold">{product.title}</h2>
    </section>
  )
}