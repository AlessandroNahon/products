import { useEffect, createContext, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ProductsComponent from "./Products";
import ProductComponent from "./Product";
import { fetchProducts, mockOptions } from "./api";

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | ''

export type ProductOption = {
  label: string
  image: string
  availableSizes: Size[]
}

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
  options?: ProductOption[]
}

export type ProductContextType = {
  products: Product[]
  selectProduct: (product: Product | {}) => void
  selectedProduct: Product | {}
  selectOption: (option: ProductOption) => void
  selectedOption: ProductOption
  selectSize: (size: Size) => void
  selectedSize: Size
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
  const [selectedOption, setSelectedOption] = useState<ProductOption>(mockOptions[0])
  const [selectedSize, setSelectedSize] = useState<Size>('')

  useEffect(() => {
    (async function call() {
      setProducts(await fetchProducts())
    })()
  }, [])

  return (
    <ProductContext.Provider value={{ products, selectProduct: setSelectedProduct, selectedProduct, selectOption: setSelectedOption, selectedOption, selectSize: setSelectedSize, selectedSize }}>
      <main>
        <RouterProvider router={router} />
      </main>
    </ProductContext.Provider>

  );
}

export default App;
