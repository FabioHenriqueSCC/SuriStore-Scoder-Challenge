export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
}

export interface ProductsCarouselProps {
  title: string;
  products: Product[];
}
