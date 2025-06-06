import { Carousel } from "@mantine/carousel";
import { Title } from "@mantine/core";

import type { ProductsCarouselProps } from "../../types/products";

import { ProductCard } from "../ProductCard/ProductCard";

import "@mantine/core/styles/Title.css";

/**
 * ProductsCarousel component for displaying a carousel of product cards.
 * 
 * This component renders a carousel that allows users to scroll through a list of products. It displays a title and a set of product cards using the `ProductCard` component. The carousel supports indicators and custom navigation controls, with options for looping and responsive slide sizing based on screen size.
 * 
 * @param {ProductsCarouselProps} props - The properties passed to the component.
 * @param {string} props.title - The title to be displayed above the carousel.
 * @param {Product[]} props.products - A list of products to display in the carousel. Each product will be passed to the `ProductCard` component for rendering.
 * 
 * @returns {JSX.Element} The rendered carousel component with product cards.
 * 
 * @example
 * // Example usage:
 * // <ProductsCarousel title="Featured Products" products={productList} />
 */
export const ProductsCarousel = ({ title, products }: ProductsCarouselProps) => {
  return (
    <div className="py-8">
      <Title order={2} className="mb-6 text-[#250D7C]">
        {title}
      </Title>
      <Carousel
        withIndicators
        emblaOptions={{ loop: true, align: "start", slidesToScroll: 5 }}
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