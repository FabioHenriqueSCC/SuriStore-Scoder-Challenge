import { Carousel } from "@mantine/carousel";
import { Title } from "@mantine/core";

import type { ProductsCarouselProps } from "../../types/products";

import { ProductCard } from "../ProductCard/ProductCard";

import "@mantine/core/styles/Title.css";

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
