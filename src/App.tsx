import { useEffect, createContext, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
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
  rate?: number,
  count?: number
}

export type ProductContextType = {
  products: Product[]
  selectProduct: (product: Product | {}) => void
  selectedProduct: Product | {}
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

export const routes = [
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "/products",
    element: <ProductsComponent />,
  },
  {
    path: "/product/:id",
    element: <ProductComponent />
  }
]
const router = createBrowserRouter(routes);

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
        <RouterProvider router={router} />
      </main>
    </ProductContext.Provider>

  );
}

export default App;
