import { Button, Loader } from "@mantine/core";

export const PaymentButton = ({
  onClick,
  isProcessing,
}: {
  onClick: () => void;
  isProcessing: boolean;
}) => (
  <Button
    onClick={onClick}
    disabled={isProcessing}
    fullWidth
    size="lg"
    mt="xl"
    color="violet"
    radius="md"
  >
    {isProcessing ? (
      <Loader color="white" size="sm" />
    ) : (
      "Realizei meu pagamento"
    )}
  </Button>
);
