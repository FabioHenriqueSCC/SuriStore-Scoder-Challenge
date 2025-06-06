import {
  IconSearch,
  IconUserCircle,
  IconHeart,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useHeaderContext } from "../../contexts/Header/HeaderContext";

import type { Product } from "../../types/products";

import LogoScoder from "../../assets/LogoScoder.png";

type CartItem = Product & { quantity: number };
const Header = () => {
  const { shoppingCart } = useHeaderContext();

  const navigate = useNavigate();

  const processedCart = useMemo(() => {
    if (!shoppingCart) return [];

    const cartWithQuantities = shoppingCart.reduce((acc, product) => {
      const existingProduct = acc[product.id];
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        acc[product.id] = { ...product, quantity: 1 };
      }
      return acc;
    }, {} as Record<number, CartItem>);

    return Object.values(cartWithQuantities);
  }, [shoppingCart]);

  const totalItems = shoppingCart ? shoppingCart.length : 0;

  return (
    <header className="bg-[#250D7C] p-4 flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8">
      <div className="flex items-center space-x-3 shrink-0">
        <img src={LogoScoder} alt="Logo Scoder" className="h-8 md:h-10" />
        <span className="text-white font-medium text-sm hidden md:block">
          Bem vindo a SuriStore, a toca dos Suricoders!
        </span>
      </div>
      <div className="w-full max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="O que você procura?"
            className="w-full py-2 px-4 rounded-lg text-sm text-gray-700 pr-10 focus:outline-none focus:ring-2 focus:ring-[#573FAE] focus:border-transparent"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <IconSearch size={20} className="text-gray-500" stroke={2} />
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
        <button
          aria-label="Minha conta"
          className="text-white text-xs items-center hidden sm:flex space-x-2 p-2 hover:bg-[#392190]/75 rounded-md transition-colors"
        >
          <IconUserCircle size={26} stroke={1.5} />
          <div className="text-left">
            <div>Entre ou cadastre-se</div>
          </div>
        </button>
        <button
          aria-label="Favoritos"
          className="text-white p-2 flex items-center hover:bg-[#392190]/75 rounded-md transition-colors"
        >
          <IconHeart size={26} stroke={1.5} />
        </button>
        <div className="relative group pb-4 -mb-4">
          <button
            aria-label="Carrinho"
            onClick={() => navigate("/shopping-cart")}
            className="text-white relative p-2 flex items-center hover:bg-[#392190]/75 rounded-md transition-colors"
          >
            <IconShoppingCart size={26} stroke={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 min-w-[16px] flex items-center justify-center p-0.5">
                {totalItems}
              </span>
            )}
          </button>

          <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl p-4 z-50 hidden group-hover:block transition-opacity duration-300">
            {processedCart.length === 0 ? (
              <div className="text-center text-gray-600">
                <p className="font-semibold">Sua toca está vazia!</p>
                <p className="text-sm mt-1">
                  Que tal explorar a loja e encontrar algo incrível para levar?
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                  Resumo do Carrinho
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {processedCart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm text-gray-700"
                    >
                      <p className="truncate pr-2">{item.title}</p>
                      <p className="font-semibold shrink-0">x{item.quantity}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-gray-500 mt-4 italic">
                  Clique no ícone para entrar na toca e se tornar um Suricoder!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
