import type { CatalogNavProps } from "../../types/options";

/**
 * CatalogNav component for rendering a navigation bar with category buttons.
 *
 * This component renders a navigation bar containing a list of categories (represented by buttons). Each button displays a category label, and when clicked, it triggers the `onCategoryClick` function with the corresponding target ID.
 * The active category (highlighted category) is styled differently using the `isHighlight` property.
 *
 * @param {CatalogNavProps} props - The properties passed to the component.
 * @param {Array} props.items - The list of category items, each containing a `label`, `targetId`, and `isHighlight` flag.
 * @param {function} props.onCategoryClick - A callback function to handle category selection, passing the selected category's target ID.
 *
 * @returns {JSX.Element} The rendered catalog navigation bar.
 *
 * @example
 * // Example usage:
 * // <CatalogNav items={categoryItems} onCategoryClick={handleCategoryClick} />
 */
export const CatalogNav = ({ items, onCategoryClick }: CatalogNavProps) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 space-x-8">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => onCategoryClick(item.targetId)}
              className={`
                text-sm font-semibold tracking-wide transition-colors duration-200
                ${item.isHighlight ? "text-purple-600" : "text-gray-800"}
                hover:text-violet-600 focus:outline-none
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
