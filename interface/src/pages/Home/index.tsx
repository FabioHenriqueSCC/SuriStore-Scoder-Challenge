import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Product } from "../../types/products";

import { useHeaderContext } from "../../contexts/Header/HeaderContext";

import { ProductsCarousel } from "../../components/ProductsCarousel/ProductsCarousel";

import { productCategory } from "../../constants/productCategory";

import { getAllProducts } from "../../services/storeApi";

export default function Home() {
  const { setAllProducts } = useHeaderContext();
  const [categorizedProducts, setCategorizedProducts] = useState<
    Record<string, Product[]>
  >({});

  useEffect(() => {
    /**
     * Fetches and groups products by category when the component mounts.
     *
     * This effect fetches the list of products from the API and groups them into categories.
     * The grouped products are stored in the state, with a special category for "valentines" that includes products from both men's and women's clothing.
     * If the fetch operation fails, an error toast is displayed, and no products are grouped.
     *
     * @async
     * @function fetchAndGroupProducts
     *
     * @returns {void} No value is returned. The function updates state with the fetched and grouped products.
     */
    const fetchAndGroupProducts = async () => {
      let products;

      try {
        const response = await getAllProducts();
        products = response.data;
      } catch {
        toast.error(
          "Ocorreu um erro ao listar os produtos. Tente novamente mais tarde!",
          { autoClose: 5000 }
        );
        return;
      }

      setAllProducts(products);

      const groupedProducts: Record<string, Product[]> = {
        valentines: [],
      };

      for (const product of products) {
        if (!groupedProducts[product.category]) {
          groupedProducts[product.category] = [];
        }
        groupedProducts[product.category].push(product);

        if (
          product.category === "men's clothing" ||
          product.category === "women's clothing"
        ) {
          groupedProducts.valentines.push(product);
        }
      }

      setCategorizedProducts(groupedProducts);
    };

    fetchAndGroupProducts();
  }, [setAllProducts]);

  return (
    <div className="p-4">
      <div className="w-full md:w-4/5 lg:w-2/3 mx-auto flex flex-col gap-10">
        {productCategory.map((config) => {
          const products = categorizedProducts[config.key];
          if (products && products.length > 0) {
            return (
              <div key={config.key} id={config.key}>
                <ProductsCarousel title={config.title} products={products} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
