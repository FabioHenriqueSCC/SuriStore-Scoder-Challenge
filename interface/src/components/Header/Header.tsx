import {
  IconSearch,
  IconUserCircle,
  IconHeart,
  IconShoppingCart,
} from "@tabler/icons-react";

import LogoScoder from "../../assets/LogoScoder.png";

/**
 * Header component for the application.
 * 
 * This component renders a header section that includes:
 * - A logo on the left.
 * - A search bar in the center for users to search for products or information.
 * - A set of buttons on the right for account management, favorites, and the shopping cart.
 * 
 * The search input field has an icon on the right and focuses on user experience with clear call-to-action buttons. 
 * The shopping cart button includes a notification badge to show the number of items in the cart.
 * 
 * @returns {JSX.Element} The header section of the application, containing navigation and user interaction elements.
 * 
 * @example
 * // Example usage:
 * // In your main file, you can render the Header component like this:
 * // <Header />
 */
const Header = () => {
  return (
    <header className="bg-[#250D7C] p-4 flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8">
      <img src={LogoScoder} alt="Logo Scoder" className="h-8 md:h-10 shrink-0" />

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
          className="text-white text-xs items-center hidden sm:flex space-x-1.5 p-1 hover:bg-[#392190]/75 rounded-md transition-colors"
        >
          <IconUserCircle size={24} stroke={1.5} />
          <div className="text-left">
            <div>Entre ou cadastre-se</div>
            <div>Meus pedidos</div>
          </div>
        </button>

        <button
          aria-label="Favoritos"
          className="text-white p-2 flex items-center hover:bg-[#392190]/75 rounded-md transition-colors"
        >
          <IconHeart size={26} stroke={1.5} />
        </button>

        <button
          aria-label="Carrinho"
          className="text-white relative p-2 flex items-center hover:bg-[#392190]/75 rounded-md transition-colors"
        >
          <IconShoppingCart size={26} stroke={1.5} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 min-w-[16px] flex items-center justify-center p-0.5">
            1
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
