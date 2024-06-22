import { StaticImageData } from "next/image";

export type Tag =
  | "cleansers"
  | "balms"
  | "treatments"
  | "moisturizers"
  | "sets";

export interface Product {
  id: string;
  sizes?: string[];
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
}
