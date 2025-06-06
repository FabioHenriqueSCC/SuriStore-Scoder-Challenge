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
export const ProductCard = ({ product }: ProductCardProps) => {
  const { shoppingCart, setShoppingCart } = useHeaderContext();

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
        onClick={() => setShoppingCart([...shoppingCart, product])}
        leftSection={<IconShoppingCart size={18} />}
      >
        Adicionar ao carrinho
      </Button>
    </Card>
  );
};
