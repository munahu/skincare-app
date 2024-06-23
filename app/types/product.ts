import { StaticImageData } from "next/image";

export type Tag =
  | "cleansers"
  | "balms"
  | "treatments"
  | "moisturizers"
  | "sets";

export interface Size {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  sizes?: Size[];
  tags: Tag[];
  name: string;
  regularPrice: number;
  salePrice?: number;
  overview: string;
  tagline: string;
  description: string;
  images: StaticImageData[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: Size;
}
