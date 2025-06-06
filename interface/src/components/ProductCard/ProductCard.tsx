import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Rating,
  Button,
  ActionIcon,
} from "@mantine/core";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";

import type { ProductCardProps } from "../../types/Products";

import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";
import { priceFormatter } from "../../utils/formatter";

/**
 * ProductCard component for displaying individual product details.
 * 
 * This component is used to render a product card, which includes:
 * - An image of the product.
 * - The product's title, category, and price.
 * - A rating section showing user ratings and the number of reviews.
 * - A button for adding the product to the shopping cart.
 * - A heart icon button for adding the product to favorites.
 * 
 * The component is styled using Mantine's `Card`, `Button`, and other UI components, with custom styling for hover effects and responsiveness.
 * 
 * @param {ProductCardProps} props - The properties passed to the component.
 * @param {ProductCardProps['product']} props.product - The product data to be displayed in the card.
 * 
 * @returns {JSX.Element} The rendered product card component.
 * 
 * @example
 * // Example usage:
 * // <ProductCard product={productData} />
 */
export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="h-full flex flex-col relative transition-all duration-300 hover:shadow-xl"
    >
      <ActionIcon
        variant="light"
        aria-label="Adicionar aos favoritos"
        size="lg"
        className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
        radius="xl"
      >
        <IconHeart stroke={1.5} />
      </ActionIcon>

      <Card.Section>
        <div className="aspect-square w-full p-4 bg-white">
          <Image
            src={product.image}
            alt={product.title}
            h="100%"
            w="auto"
            mx="auto"
            fit="contain"
          />
        </div>
      </Card.Section>

      <div className="flex flex-col flex-grow mt-4">
        <Group justify="space-between">
          <Badge
            variant="light"
            style={{ backgroundColor: "#E4E1FF", color: "#6052E4" }}
            className="capitalize"
          >
            {product.category}
          </Badge>
        </Group>

        <Text fw={500} lineClamp={2} className="text-[#250D7C] my-3">
          {product.title}
        </Text>

        <Group gap="xs">
          <Rating value={product.rating.rate} fractions={2} readOnly />
          <Text size="sm" c="dimmed">
            ({product.rating.count} avaliações)
          </Text>
        </Group>

        <div className="mt-auto pt-4">
          <Text c="#250D7C" size="xl" fw={700}>
            {priceFormatter(product.price)}
          </Text>
        </div>
      </div>

      <Button
        color="#6052E4"
        fullWidth
        mt="md"
        radius="md"
        leftSection={<IconShoppingCart size={18} />}
      >
        Adicionar ao carrinho
      </Button>
    </Card>
  );
};