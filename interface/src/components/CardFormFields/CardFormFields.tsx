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

/**
 * CardFormFields component for rendering the credit card input fields in a form.
 *
 * This component renders a series of form fields required for entering credit card details, such as:
 * - Full name (as on the card)
 * - Card number (with masking)
 * - Expiry date (with masking)
 * - CVV (with password input)
 * - Installment options (only for credit cards)
 *
 * The component uses Mantine's form controls (`TextInput`, `Input`, `PasswordInput`, `Select`, etc.) and includes IMask for card number and expiry date formatting.
 *
 * The fields are disabled when the `isProcessing` flag is `true`, to prevent input during processing.
 * The "Parcelamento" (installments) option is only shown when the `activeTab` is `"credit"`, and it is disabled when the total price is zero or while processing.
 *
 * @param {CardFormFieldsProps} props - The properties passed to the component.
 * @param {import('mantine').UseFormReturnType} props.form - The form object used to manage form state and validation.
 * @param {boolean} props.isProcessing - A flag that disables the input fields when processing is in progress.
 * @param {string} props.activeTab - The active tab, which determines if installment options are shown.
 * @param {Array} props.installmentOptions - The list of available installment options for the credit card payment.
 * @param {number} props.totalPrice - The total price, which is used to determine if the installment options are available.
 *
 * @returns {JSX.Element} The form fields for credit card input.
 *
 * @example
 * // Example usage:
 * // <CardFormFields
 * //   form={form}
 * //   isProcessing={isProcessing}
 * //   activeTab="credit"
 * //   installmentOptions={installmentOptions}
 * //   totalPrice={totalPrice}
 * // />
 */
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
