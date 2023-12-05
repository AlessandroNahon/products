import { useContext } from "react"
import { ProductContext } from "./App"
import { fetchProduct } from "./api"

export default function ProductsComponent() {
  const { products, selectProduct } = useContext(ProductContext)
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-stretch auto-rows-max sm:p-10 md:p-15 lg:p-20">
      {
        products.map((p: any) => (
          <div key={p.id} className="p-5 flex flex-col justify-between cursor-pointer" onClick={async () => selectProduct(await fetchProduct(p.id))}>
            <div className="aspect-video bg-left bg-contain bg-no-repeat mb-5" style={{ backgroundImage: `url(${p.image})` }}></div>
            <h3 className="text-xl font-bold h-3/6">{p.title.length > 45 ? `${p.title.substring(0, 45)}...` : p.title}</h3>
          </div>
        ))
      }
    </section>
  )
}