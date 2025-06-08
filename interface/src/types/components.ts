import type { UseFormReturnType } from "@mantine/form";

export interface PaymentButtonProps {
  isProcessing: boolean;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardFormValues {
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  installments: string | null;
}

export interface CardFormFieldsProps {
  form: UseFormReturnType<CardFormValues>;
  isProcessing: boolean;
  activeTab: string | null;
  installmentOptions: { value: string; label: string }[];
  totalPrice: number;
}
