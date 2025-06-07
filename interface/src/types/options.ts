export interface InstallmentOption {
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  targetId: string;
  isHighlight?: boolean;
}

export interface CatalogNavProps {
  items: NavItem[];
  onCategoryClick: (targetId: string) => void;
}
