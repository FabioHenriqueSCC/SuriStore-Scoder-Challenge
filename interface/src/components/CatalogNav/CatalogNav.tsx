import type { CatalogNavProps } from "../../types/options";

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
