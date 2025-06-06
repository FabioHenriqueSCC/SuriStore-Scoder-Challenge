import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Product } from "../../types/products";

import { ProductsCarousel } from "../../components/ProductsCarousel/ProductsCarousel";

import { getAllProducts } from "../../services/storeApi";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    /**
     * Fetches and sets the list of all products when the component is mounted.
     *
     * This effect runs once when the component is mounted, fetching the list of products from an API. If the request is successful, the products are stored in the component's state using `setProducts`. If an error occurs during the fetch operation, an error toast is shown to the user.
     *
     * The `useEffect` hook depends on an empty dependency array (`[]`), meaning it will only run once after the initial render.
     *
     * @async
     * @function listAllProducts
     *
     * @returns {void} This hook does not return anything.
     */
    const listAllProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts.data);
      } catch {
        toast.error(
          "Ocorreu um erro ao listar os produtos disponíves. Tente novamente mais tarde!",
          { autoClose: 5000 }
        );
      }
    };

    listAllProducts();
  }, []);

  return (
    <div className="p-4">
      <div className="w-full md:w-4/5 lg:w-2/3 mx-auto">
        <ProductsCarousel title="Catálogo" products={products} />
      </div>
    </div>
  );
}
