import { useNavigate } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'

import Image from "./Image"
import { fetchProducts } from "./api"

export default function ProductsComponent() {
  const { data } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })
  const navigate = useNavigate()

  return (
    <section data-testid="section" className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-stretch auto-rows-max sm:p-10 md:p-15 lg:p-20">
      {
        !data ? (<div className="p-5 flex flex-col justify-between">
        </div>) : data.map((p: any) => (
          <div data-testid={`product-${p.id}`} key={p.id} className="p-5 flex flex-col justify-between cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
            <Image className="aspect-video bg-left bg-contain bg-no-repeat mb-5" image={p.image} />
            <h3 className="text-xl font-bold h-3/6">{p.title.length > 45 ? `${p.title.substring(0, 45)}...` : p.title}</h3>
          </div>
        ))
      }
    </section>
  )
}