import { Button, Loader } from "@mantine/core";
import type { PaymentButtonProps } from "../../types/components";

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
