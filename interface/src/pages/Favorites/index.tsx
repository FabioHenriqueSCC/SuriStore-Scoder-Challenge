import { Button, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { useHeaderContext } from "../../contexts/Header/HeaderContext";

import { ProductCard } from "../../components/ProductCard/ProductCard";

export default function Favorites() {
  const { favorites } = useHeaderContext();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#250D7C] mb-8">
          Meus Favoritos
        </h1>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showDescription={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Text size="lg" c="dimmed">
              Você ainda não adicionou nenhum item aos favoritos.
            </Text>
            <Text c="dimmed" className="mb-4">
              Clique no ícone de coração nos produtos para começar!
            </Text>
            <Button
              color="#6052E4"
              size="md"
              onClick={() => navigate("/")}
              leftSection={<IconArrowLeft size={18} />}
            >
              Continuar comprando
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
