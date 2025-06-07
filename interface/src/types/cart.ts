import type { Product } from "./products";

export interface CartItemType extends Product {
  quantity: number;
}

export interface CartSummaryProps {
  items: CartItemType[];
}

export interface CartItemCardProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}
