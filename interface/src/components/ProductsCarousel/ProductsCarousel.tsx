import { Carousel } from "@mantine/carousel";
import { Title } from "@mantine/core";

import type { ProductsCarouselProps } from "../../types/products";

import { ProductCard } from "../ProductCard/ProductCard";

import "@mantine/core/styles/Title.css";

/**
 * ProductsCarousel component for displaying a carousel of product cards.
 *
 * This component renders a carousel of products, allowing users to scroll through product cards.
 * It displays a title at the top and a list of product cards, each rendered using the `ProductCard` component.
 * The carousel includes indicators for navigation and is configured to loop through the slides and display them in a responsive layout.
 *
 * @param {ProductsCarouselProps} props - The properties passed to the component.
 * @param {string} props.title - The title displayed above the carousel.
 * @param {Product[]} props.products - The list of products to display in the carousel.
 *
 * @returns {JSX.Element} The rendered product carousel component.
 *
 * @example
 * // Example usage:
 * // <ProductsCarousel title="Featured Products" products={productList} />
 */
export const ProductsCarousel = ({
  title,
  products,
}: ProductsCarouselProps) => {
  return (
    <div className="py-8">
      <Title order={2} className="mb-6 text-[#250D7C]">
        {title}
      </Title>
      <Carousel
        withIndicators
        emblaOptions={{ loop: false, align: "start", slidesToScroll: 1 }}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        styles={{
          control: {
            backgroundColor: "#6052E4",
            color: "white",
            borderColor: "#6052E4",
            "&:hover": {
              backgroundColor: "#250D7C",
            },
          },
          indicator: {
            backgroundColor: "#6052E4",
          },
        }}
      >
        {products.map((product) => (
          <Carousel.Slide key={product.id} className="flex">
            <ProductCard product={product} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};
