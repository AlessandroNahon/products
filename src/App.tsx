import { useEffect, createContext, useState } from "react";
import Products from "./Products";

export const ProductContext = createContext<any>([]);

function App() {
  const [products, setProducts] = useState<any>([])

  async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products')
    return await res.json()
  }

  useEffect(() => {
    (async function call() {
      setProducts(await fetchProducts())
    })()
  }, [])

  return (
    <ProductContext.Provider value={{ products }}>
      <main>
        <Products />
      </main>
    </ProductContext.Provider>

  );
}

export default App;
