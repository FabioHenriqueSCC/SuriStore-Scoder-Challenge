import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  Badge,
  Flex,
} from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

import type { CartItemCardProps } from "../../types/cart";

import { priceFormatter } from "../../utils/formatter";

export const CartCard = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) => {
  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Flex gap="md" direction={{ base: "column", sm: "row" }}>
        <Card.Section className="w-full sm:w-1/4 flex items-center justify-center p-4 bg-white">
          <Image
            src={item.image}
            alt={item.title}
            h={120}
            w="auto"
            fit="contain"
          />
        </Card.Section>

        <Flex
          direction="column"
          justify="space-between"
          className="flex-grow p-2"
        >
          <div>
            <Badge
              variant="light"
              style={{ backgroundColor: "#E4E1FF", color: "#6052E4" }}
              className="capitalize"
            >
              {item.category}
            </Badge>
            <Text
              fw={500}
              lineClamp={1}
              className="text-[#250D7C] my-2 text-lg"
            >
              {item.title}
            </Text>
            <Text size="sm" c="dimmed" lineClamp={2}>
              {item.description}
            </Text>
          </div>
          <Group justify="space-between" align="center" mt="md">
            <Text c="#250D7C" size="lg" fw={700}>
              {priceFormatter(item.price)}
            </Text>
          </Group>
        </Flex>

        <Flex
          direction="column"
          align="center"
          justify="center"
          className="p-2"
          gap="xs"
        >
          <ActionIcon size="lg" variant="default" onClick={handleIncrease}>
            <IconPlus size={16} />
          </ActionIcon>
          <Text fw={500} w={20} ta="center" py="xs">
            {item.quantity}
          </Text>
          <ActionIcon
            size="lg"
            variant="default"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            <IconMinus size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="light"
            size="lg"
            onClick={() => onRemove(item.id)}
            mt="md"
          >
            <IconTrash size={20} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
}
