import { useState, useMemo } from "react";
import { Tabs, Stack, Text, Title, Paper, Alert, Image } from "@mantine/core";
import {
  IconAlertCircle,
  IconCreditCard,
  IconQrcode,
  IconBarcode,
  IconDeviceMobile,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

import type { CardFormValues } from "../../types/components";

import { useHeaderContext } from "../../contexts/Header/HeaderContext";

import { PaymentButton } from "../../components/PaymentButton/PaymentButton";
import { PixTimer } from "../../components/PixTimer/PixTimer";
import { CardFormFields } from "../../components/CardFormFields/CardFormFields";

import { calculateInstallmentOptions } from "../../utils/calculator";
import { priceFormatter } from "../../utils/formatter";

export default function Buy() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("pix");

  const { shoppingCart, setShoppingCart } = useHeaderContext();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return shoppingCart.reduce((total, product) => total + product.price, 0);
  }, [shoppingCart]);

  const installmentOptions = calculateInstallmentOptions(totalPrice);

  const form = useForm<CardFormValues>({
    mode: "uncontrolled",
    initialValues: {
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      installments: null,
    },
    validate: (values) => {
      if (activeTab !== "credit" && activeTab !== "debit") {
        return {};
      }
      const errors: Record<string, string> = {};
      if (values.cardName.trim().length < 3) {
        errors.cardName = "Nome no cartão é obrigatório";
      }
      if (values.cardNumber.replace(/\s/g, "").length < 16) {
        errors.cardNumber = "Número do cartão deve ter 16 dígitos";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.cardExpiry)) {
        errors.cardExpiry = "Data de validade inválida (use MM/AA)";
      }
      if (values.cardCvv.length < 3) {
        errors.cardCvv = "CVV é obrigatório e deve ter 3 ou 4 dígitos";
      }
      if (activeTab === "credit" && !values.installments) {
        errors.installments = "Selecione o número de parcelas";
      }
      return errors;
    },
  });

  /**
   * Handles the payment process with simulated delay and notifications.
   *
   * This function simulates the payment processing by introducing a random delay between 5 to 10 seconds.
   * During the delay, an "info" toast is shown to indicate the payment is being processed. Once the payment is completed,
   * a success toast is shown. After that, a reminder warning and error toast are displayed to clarify that it's a fictional transaction.
   * After the process, the shopping cart is cleared, the form is reset, and the user is navigated to the home page.
   *
   * @async
   * @function handlePayment
   *
   * @returns {void} No value is returned. The function triggers UI updates and navigation.
   */
  const handlePayment = async () => {
    setIsProcessing(true);
    toast.info("Processando seu pagamento... Aguarde.");
    const delay = Math.random() * (10000 - 5000) + 5000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    setIsProcessing(false);
    toast.success("Pagamento concluído com sucesso! A toca agradece!", {
      autoClose: 5000,
    });
    setTimeout(
      () =>
        toast.warn("LEMBRETE: Esta é uma compra fictícia!", {
          autoClose: 7500,
        }),
      2000
    );
    setTimeout(
      () =>
        toast.error("NENHUM DADO REAL FOI USADO. Projeto para portfólio.", {
          autoClose: 10000,
        }),
      2000
    );
    setShoppingCart([]);
    form.reset();
    navigate("/");
  };

  /**
   * Handles the form submission click event for the payment process.
   *
   * This function triggers the payment process when the user submits the form.
   * If the active tab is "credit" or "debit", it first calls the `form.onSubmit` function to validate and submit the form data before invoking the `handlePayment` function.
   * If the active tab is neither "credit" nor "debit", it directly calls the `handlePayment` function.
   *
   * @returns {void} No value is returned. The function triggers form validation and payment handling.
   *
   * @example
   * // Example usage:
   * // handleSubmitClick();
   */
  const handleSubmitClick = () => {
    if (activeTab === "credit" || activeTab === "debit") {
      form.onSubmit(handlePayment)();
    } else {
      handlePayment();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <Paper shadow="xl" p="xl" radius="md" className="w-full max-w-lg">
        <form>
          <Stack gap="lg">
            <header className="text-center">
              <Title order={2} c="dark.5">
                Finalize sua Compra
              </Title>
              <Text c="dimmed" size="sm" mt={4}>
                Escolha a forma de pagamento abaixo
              </Text>
            </header>

            <Paper withBorder p="md" radius="md">
              <Title order={4} ta="center" c="violet.7">
                Total da Compra: {priceFormatter(totalPrice)}
              </Title>
            </Paper>

            <Alert
              variant="light"
              color="orange"
              title="Atenção: Compra Fictícia"
              icon={<IconAlertCircle />}
              radius="md"
            >
              Este é um projeto de demonstração.{" "}
              <strong>NÃO insira dados reais</strong>. Nenhuma informação será
              processada ou armazenada.
            </Alert>

            <Tabs
              value={activeTab}
              onChange={(value) => {
                setActiveTab(value);
                form.clearErrors();
              }}
              variant="pills"
              radius="md"
              color="violet"
            >
              <Tabs.List grow>
                <Tabs.Tab value="pix" leftSection={<IconQrcode size={18} />}>
                  Pix
                </Tabs.Tab>
                <Tabs.Tab
                  value="ticket"
                  leftSection={<IconBarcode size={18} />}
                >
                  Boleto
                </Tabs.Tab>
                <Tabs.Tab
                  value="credit"
                  leftSection={<IconCreditCard size={18} />}
                >
                  Crédito
                </Tabs.Tab>
                <Tabs.Tab
                  value="debit"
                  leftSection={<IconDeviceMobile size={18} />}
                >
                  Débito
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="pix" pt="lg">
                <Stack align="center" gap="md">
                  <Text ta="center" size="sm">
                    Para pagar {priceFormatter(totalPrice)}, escaneie o QR Code
                    abaixo.
                  </Text>
                  <Image
                    radius="md"
                    h={250}
                    w={250}
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=pagamento-ficticio-valor-${totalPrice}`}
                    alt="QR Code Fictício para pagamento Pix"
                  />
                  <Text ta="center" c="dimmed" size="xs">
                    Este código expira em:
                  </Text>
                  <PixTimer />
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="ticket" pt="lg">
                <Stack align="center" gap="md" className="py-8">
                  <Text ta="center" size="sm">
                    Você pode pagar o boleto de {priceFormatter(totalPrice)}{" "}
                    usando o QR Code abaixo.
                  </Text>
                  <Image
                    radius="md"
                    h={250}
                    w={250}
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=boleto-ficticio-valor-${totalPrice}`}
                    alt="QR Code Fictício para pagamento de boleto"
                  />
                  <Text c="dimmed" size="xs" ta="center">
                    A confirmação do pagamento (fictícia) ocorrerá após o
                    processamento.
                  </Text>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="credit" pt="lg">
                <CardFormFields
                  form={form}
                  isProcessing={isProcessing}
                  activeTab={activeTab}
                  installmentOptions={installmentOptions}
                  totalPrice={totalPrice}
                />
              </Tabs.Panel>

              <Tabs.Panel value="debit" pt="lg">
                <CardFormFields
                  form={form}
                  isProcessing={isProcessing}
                  activeTab={activeTab}
                  installmentOptions={installmentOptions}
                  totalPrice={totalPrice}
                />
              </Tabs.Panel>
            </Tabs>
            <PaymentButton
              type="button"
              onClick={handleSubmitClick}
              isProcessing={isProcessing}
            />
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
