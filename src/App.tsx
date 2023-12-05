import { useEffect, createContext, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ProductsComponent from "./Products";
import ProductComponent from "./Product";
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductsComponent />,
    },
    {
      path: "/product/:id",
      element: <ProductComponent product={selectedProduct as Product} />
    }
  ]);

  useEffect(() => {
    (async function call() {
      setProducts(await fetchProducts())
    })()
  }, [])

  return (
    <ProductContext.Provider value={{ products, selectProduct: setSelectedProduct, selectedProduct }}>
      <main>
        <RouterProvider router={router} />
      </main>
    </ProductContext.Provider>

  );
}

export default App;
