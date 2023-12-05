import { useEffect, createContext, useState } from "react";
import ProductsComponent from "./Products";
import { fetchProducts } from "./api";

export type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    count: number,
    rate: number
  },
  rate: number,
  count: number
}

type ProductContextType = {
  products: Product[]
  selectProduct: (product: Product | {}) => void
  selectedProduct: Product | {}
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

function App() {
  const [products, setProducts] = useState<Product[] | []>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | {}>({})

  useEffect(() => {
    (async function call() {
      setProducts(await fetchProducts())
    })()
  }, [])

  return (
    <ProductContext.Provider value={{ products, selectProduct: setSelectedProduct, selectedProduct }}>
      <main>
        <ProductsComponent />
      </main>
    </ProductContext.Provider>

  );
}

export default App;
