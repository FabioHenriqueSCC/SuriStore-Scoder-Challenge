import { useMemo } from "react";
import { Card, Text, Button, Divider, Title, Group } from "@mantine/core";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import type { CartSummaryProps } from "../../types/cart";

import { priceFormatter } from "../../utils/formatter";

export function CartSummary({ items }: CartSummaryProps) {
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);
  const navigate = useNavigate();

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.warning(
        "Entre com sua identificação de Suricoder para finalizar a compra na toca!",
        { autoClose: 5000 }
      );
      navigate("/login");
      return;
    }

    navigate("/buy");
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2} mb="md" className="text-[#250D7C]">
        Resumo do pedido
      </Title>
      <Divider my="sm" />
      <Group justify="space-between" my="sm">
        <Text>Subtotal</Text>
        <Text>{priceFormatter(total)}</Text>
      </Group>
      <Divider my="sm" />
      <Group justify="space-between" my="md">
        <Text fw={700} size="xl" className="text-[#250D7C]">
          Total
        </Text>
        <Text fw={700} size="xl" className="text-[#250D7C]">
          {priceFormatter(total)}
        </Text>
      </Group>
      <Button
        color="#6052E4"
        fullWidth
        mt="md"
        radius="md"
        size="lg"
        onClick={handleCheckout}
      >
        Comprar
      </Button>
    </Card>
  );
}
