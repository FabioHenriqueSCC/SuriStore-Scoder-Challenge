import { Button, Loader } from "@mantine/core";
import type { PaymentButtonProps } from "../../types/components";

/**
 * PaymentButton component for processing payments.
 *
 * This component renders a button that displays a loading spinner (`Loader`) when a payment is being processed.
 * The button is disabled while processing, preventing multiple submissions.
 * If the payment is not being processed, the button displays "Realizar Pagamento" as the label.
 *
 * @param {PaymentButtonProps} props - The properties passed to the component.
 * @param {boolean} props.isProcessing - A flag that indicates whether the payment is being processed.
 * @param {boolean} props.disabled - A flag that disables the button (optional).
 *
 * @returns {JSX.Element} The rendered payment button.
 *
 * @example
 * // Example usage:
 * // <PaymentButton isProcessing={isProcessing} onClick={handlePayment} />
 */
export const PaymentButton = ({
  isProcessing,
  ...props
}: PaymentButtonProps) => (
  <Button
    {...props}
    disabled={isProcessing || props.disabled}
    fullWidth
    size="lg"
    mt="xl"
    color="violet"
    radius="md"
  >
    {isProcessing ? <Loader color="white" size="sm" /> : "Realizar Pagamento"}
  </Button>
);
