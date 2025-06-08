import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Stack,
  Loader,
  Center,
  Image,
  Rating,
  Group,
  AspectRatio,
} from "@mantine/core";
import { IconShoppingCart, IconCreditCard } from "@tabler/icons-react";

import type { Product } from "../../types/products";

import { useHeaderContext } from "../../contexts/Header/HeaderContext";

import { priceFormatter } from "../../utils/formatter";

import { getProductWithID } from "../../services/storeApi";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { shoppingCart, setShoppingCart } = useHeaderContext();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches and sets product details based on the product ID.
     *
     * This effect fetches the product details from the API using the `getProductWithID` function whenever the `productId` changes.
     * The product data is stored in the `setProduct` state, and the loading state is handled to indicate when the fetch operation is in progress.
     * If the product fetch fails, the product state is set to `null`.
     *
     * @async
     * @function listProduct
     *
     * @returns {void} No value is returned. The function updates the product state and manages loading state.
     */
    const listProduct = async () => {
      setLoading(true);

      try {
        const apiResponse = await getProductWithID(productId);
        const productData = apiResponse.data;
        setProduct(productData);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      listProduct();
    }
  }, [productId, navigate]);

  /**
   * Handles the "Buy Now" action.
   *
   * This function checks if the user is authenticated by looking for a token in `localStorage`.
   * If the token is not found, the user is redirected to the login page with a warning toast message.
   * If the token is present, the user is navigated to the purchase page.
   *
   * @returns {void} No value is returned. The function triggers navigation based on the authentication state.
   *
   * @example
   * // Example usage:
   * // handleBuyNow();
   */
  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.warning(
        "Entre com sua identificação de Suricoder para finalizar a compra na toca!",
        { autoClose: 5000 }
      );
      navigate("/login");
      return;
    }
    navigate("/buy");
  };

  if (loading) {
    return (
      <Center style={{ height: "80vh" }}>
        <Loader color="violet" size="xl" />
      </Center>
    );
  }

  if (!product) {
    return (
      <Center style={{ height: "80vh" }}>
        <Stack align="center">
          <Title order={2}>Oops! Produto não encontrado.</Title>
          <Text c="dimmed">
            O produto que você está procurando não existe ou foi removido.
          </Text>
          <Button onClick={() => navigate("/")} color="violet" mt="md">
            Voltar para a loja
          </Button>
        </Stack>
      </Center>
    );
  }

  return (
    <Container size="lg" my="xl">
      <Grid gutter={{ base: 20, md: 40 }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            <Title order={2} className="text-gray-900 font-bold">
              {product.title}
            </Title>
            <Group gap="xs">
              <Rating value={product.rating.rate} fractions={2} readOnly />
              <Text size="sm" c="dimmed">
                ({product.rating.rate.toFixed(1)}) - {product.rating.count}{" "}
                avaliações
              </Text>
            </Group>
            <Text size="xl" c="#250D7C">
              {priceFormatter(product.price)}
            </Text>
            <div>
              <Text mb="xs">Descrição:</Text>
              <Text c="dimmed" size="sm" lh={1.6}>
                {product.description}
              </Text>
            </div>
            <Stack gap="xs" mt="xl">
              <Button
                color="violet"
                size="lg"
                fullWidth
                onClick={() => setShoppingCart([...shoppingCart, product])}
                leftSection={<IconShoppingCart size={20} />}
              >
                Adicionar ao carrinho
              </Button>
              <Button
                variant="outline"
                color="violet"
                size="lg"
                fullWidth
                onClick={handleBuyNow}
                leftSection={<IconCreditCard size={20} />}
              >
                Comprar agora
              </Button>
            </Stack>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <div className="sticky top-20">
            <AspectRatio
              ratio={1 / 1}
              className="bg-gray-100 rounded-md overflow-hidden shadow-sm"
            >
              <Image src={product.image} alt={product.title} fit="contain" />
            </AspectRatio>
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
