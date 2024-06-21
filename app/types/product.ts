import { StaticImageData } from "next/image";

export type Tag =
  | "cleansers"
  | "balms"
  | "treatments"
  | "moisturizers"
  | "sets";

export interface Product {
  id: string;
  set?: boolean;
  sizes?: string[];
  tags: Tag[];
  name: string;
  regularPrice: number;
  salePrice?: number;
  overview: string;
  description: string;
  image: StaticImageData;
}

export interface CartItem extends Product {
  quantity: number;
}
