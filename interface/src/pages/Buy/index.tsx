import { useState, useMemo } from "react";
import {
  Tabs,
  TextInput,
  Select,
  Group,
  Stack,
  Text,
  Title,
  Paper,
  Alert,
  Image,
  PasswordInput,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconCreditCard,
  IconQrcode,
  IconBarcode,
  IconDeviceMobile,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useHeaderContext } from "../../contexts/Header/HeaderContext";

import { PaymentButton } from "../../components/PaymmentButton/PaymmentButton";
import { PixTimer } from "../../components/PixTimer/PixTimer";

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
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <Paper shadow="xl" p="xl" radius="md" className="w-full max-w-lg">
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
            onChange={setActiveTab}
            variant="pills"
            radius="md"
            color="violet"
          >
            <Tabs.List grow>
              <Tabs.Tab value="pix" leftSection={<IconQrcode size={18} />}>
                Pix
              </Tabs.Tab>
              <Tabs.Tab value="boleto" leftSection={<IconBarcode size={18} />}>
                Boleto
              </Tabs.Tab>
              <Tabs.Tab
                value="credito"
                leftSection={<IconCreditCard size={18} />}
              >
                Crédito
              </Tabs.Tab>
              <Tabs.Tab
                value="debito"
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

            <Tabs.Panel value="boleto" pt="lg">
              <Stack align="center" gap="md" className="py-8">
                <IconBarcode
                  size={120}
                  stroke={1.5}
                  className="text-gray-400"
                />
                <Text ta="center" size="sm">
                  O boleto de {priceFormatter(totalPrice)} será gerado com
                  vencimento em 3 dias úteis.
                </Text>
                <Text c="dimmed" size="xs" ta="center">
                  A confirmação do pagamento (fictícia) ocorrerá após o
                  processamento.
                </Text>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="credito" pt="lg">
              <Stack gap="md">
                <TextInput
                  label="Nome Completo (como no cartão)"
                  placeholder="Seu Nome Completo"
                  radius="md"
                  disabled={isProcessing}
                />
                <TextInput
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                  radius="md"
                  disabled={isProcessing}
                />
                <Group grow>
                  <TextInput
                    label="Validade"
                    placeholder="MM/AA"
                    radius="md"
                    disabled={isProcessing}
                  />
                  <PasswordInput
                    label="CVV"
                    placeholder="***"
                    radius="md"
                    disabled={isProcessing}
                  />
                </Group>
                <Select
                  label="Opções de Parcelamento"
                  data={installmentOptions}
                  radius="md"
                  disabled={isProcessing || totalPrice === 0}
                  placeholder={
                    totalPrice === 0
                      ? "Adicione itens ao carrinho"
                      : "Escolha o número de parcelas"
                  }
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="debito" pt="lg">
              <Stack gap="md">
                <TextInput
                  label="Nome Completo (como no cartão)"
                  placeholder="Seu Nome Completo"
                  radius="md"
                  disabled={isProcessing}
                />
                <TextInput
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                  radius="md"
                  disabled={isProcessing}
                />
                <Group grow>
                  <TextInput
                    label="Validade"
                    placeholder="MM/AA"
                    radius="md"
                    disabled={isProcessing}
                  />
                  <PasswordInput
                    label="CVV"
                    placeholder="***"
                    radius="md"
                    disabled={isProcessing}
                  />
                </Group>
              </Stack>
            </Tabs.Panel>
          </Tabs>

          {activeTab && (
            <PaymentButton
              onClick={handlePayment}
              isProcessing={isProcessing}
            />
          )}
        </Stack>
      </Paper>
    </div>
  );
}
