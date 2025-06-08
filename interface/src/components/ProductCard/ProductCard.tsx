import { useMemo } from "react";
import { Link } from "react-router-dom";
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

import type { ProductCardProps } from "../../types/products";
import { useHeaderContext } from "../../contexts/Header/HeaderContext";
import { priceFormatter } from "../../utils/formatter";

import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";

/**
 * ProductCard component for displaying individual product details in a card format.
 *
 * This component displays a product card with:
 * - Product image, title, and category.
 * - An optional description that can be shown based on the `showDescription` prop.
 * - Product rating and number of reviews.
 * - A button for adding the product to the shopping cart.
 * - A button for toggling the product as a favorite.
 *
 * When the favorite button is clicked, the product is either added to or removed from the user's favorites list.
 * When the add-to-cart button is clicked, the product is added to the shopping cart.
 * The product details link to the individual product page.
 *
 * @param {ProductCardProps} props - The properties passed to the component.
 * @param {Product} props.product - The product to display.
 * @param {boolean} [props.showDescription=false] - A flag to determine whether to show the product description.
 *
 * @returns {JSX.Element} The rendered product card.
 *
 * @example
 * // Example usage:
 * // <ProductCard product={productData} showDescription={true} />
 */
export const ProductCard = ({
  product,
  showDescription = false,
}: ProductCardProps) => {
  const { shoppingCart, setShoppingCart, favorites, setFavorites } =
    useHeaderContext();

  const isFavorite = useMemo(
    () => favorites.some((favProduct) => favProduct.id === product.id),
    [favorites, product.id]
  );

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFavorite) {
      setFavorites(
        favorites.filter((favProduct) => favProduct.id !== product.id)
      );
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShoppingCart([...shoppingCart, product]);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none" }}
      className="h-full"
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="h-full flex flex-col relative transition-all duration-300 hover:shadow-xl"
      >
        <ActionIcon
          variant={isFavorite ? "filled" : "light"}
          color={isFavorite ? "red" : "gray"}
          aria-label="Adicionar aos favoritos"
          size="lg"
          className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
          radius="xl"
          onClick={handleToggleFavorite}
        >
          <IconHeart
            stroke={1.5}
            style={{ fill: isFavorite ? "currentColor" : "none" }}
          />
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

          {showDescription && (
            <Text size="sm" c="dimmed" lineClamp={4} mb="sm">
              {product.description}
            </Text>
          )}

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
          onClick={handleAddToCart}
          leftSection={<IconShoppingCart size={18} />}
        >
          Adicionar ao carrinho
        </Button>
      </Card>
    </Link>
  );
};
