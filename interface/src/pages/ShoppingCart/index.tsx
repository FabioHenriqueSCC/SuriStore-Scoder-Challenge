import { useMemo } from "react";
import {
  Title,
  Text,
  Container,
  Grid,
  Flex,
  Button,
  Card,
} from "@mantine/core";
import { IconArrowLeft, IconShoppingCartOff } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import type { CartItemType } from "../../types/cart";

import { useHeaderContext } from "../../contexts/Header/HeaderContext";

import { CartCard } from "../../components/CartCard/CartCard";
import { CartSummary } from "../../components/CartSummary/CartSummary";

export default function ShoppingCart() {
  const { shoppingCart, setShoppingCart } = useHeaderContext();
  const navigate = useNavigate();

  const processedCartItems = useMemo((): CartItemType[] => {
    const itemsMap = new Map<number, CartItemType>();

    shoppingCart.forEach((product) => {
      if (itemsMap.has(product.id)) {
        const existingItem = itemsMap.get(product.id)!;
        existingItem.quantity++;
      } else {
        itemsMap.set(product.id, { ...product, quantity: 1 });
      }
    });

    const groupedItems = Array.from(itemsMap.values());

    return groupedItems.sort((a, b) => a.id - b.id);
  }, [shoppingCart]);

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    const productToUpdate = shoppingCart.find((p) => p.id === productId);
    if (!productToUpdate) return;

    const cartWithoutProduct = shoppingCart.filter((p) => p.id !== productId);

    const newProductInstances = Array(newQuantity).fill(productToUpdate);

    setShoppingCart([...cartWithoutProduct, ...newProductInstances]);
  };

  const handleRemoveItem = (productId: number) => {
    setShoppingCart((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" className="text-[#250D7C]">
        Meu Carrinho
      </Title>

      {processedCartItems.length === 0 ? (
        <Card withBorder radius="md" p="xl" className="text-center">
          <IconShoppingCartOff
            size={80}
            stroke={1.5}
            className="text-gray-400 mx-auto"
          />
          <Title order={3} mt="lg">
            Seu carrinho está vazio
          </Title>
          <Text c="dimmed" mt="sm" mb="lg">
            Parece que você ainda não adicionou nenhum item.
          </Text>
          <Button
            color="#6052E4"
            size="md"
            onClick={() => navigate("/")}
            leftSection={<IconArrowLeft size={18} />}
          >
            Continuar comprando
          </Button>
        </Card>
      ) : (
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Flex direction="column" gap="md">
              {processedCartItems.map((item) => (
                <CartCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <div className="sticky top-24">
              <CartSummary items={processedCartItems} />
            </div>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
}
