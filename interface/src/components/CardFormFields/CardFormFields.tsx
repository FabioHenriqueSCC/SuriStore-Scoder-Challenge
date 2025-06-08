import {
  Group,
  Input,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import type { CardFormFieldsProps } from "../../types/components";

import { IMaskInput } from "react-imask";

export const CardFormFields = ({
  form,
  isProcessing,
  activeTab,
  installmentOptions,
  totalPrice,
}: CardFormFieldsProps) => (
  <Stack gap="md">
    <TextInput
      label="Nome Completo (como no cartão)"
      placeholder="Seu Nome Completo"
      radius="md"
      disabled={isProcessing}
      required
      {...form.getInputProps("cardName")}
    />
    <Input.Wrapper
      label="Número do Cartão"
      required
      error={form.errors.cardNumber}
    >
      <Input
        component={IMaskInput}
        mask="0000 0000 0000 0000"
        placeholder="0000 0000 0000 0000"
        radius="md"
        disabled={isProcessing}
        {...form.getInputProps("cardNumber")}
      />
    </Input.Wrapper>

    <Group grow>
      <Input.Wrapper label="Validade" required error={form.errors.cardExpiry}>
        <Input
          component={IMaskInput}
          mask="00/00"
          placeholder="MM/AA"
          radius="md"
          disabled={isProcessing}
          {...form.getInputProps("cardExpiry")}
        />
      </Input.Wrapper>
      <PasswordInput
        label="CVV"
        placeholder="***"
        radius="md"
        required
        maxLength={4}
        disabled={isProcessing}
        {...form.getInputProps("cardCvv")}
      />
    </Group>

    {activeTab === "credit" && (
      <Select
        label="Opções de Parcelamento"
        data={installmentOptions}
        radius="md"
        required
        disabled={isProcessing || totalPrice === 0}
        placeholder={
          totalPrice === 0
            ? "Adicione itens ao carrinho"
            : "Escolha o número de parcelas"
        }
        {...form.getInputProps("installments")}
      />
    )}
  </Stack>
);
