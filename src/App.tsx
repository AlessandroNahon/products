import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ProductsComponent from "./Products";
import ProductComponent from "./Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <RouterProvider router={router} />
      </main>
    </QueryClientProvider>
  );
}

export default App;
