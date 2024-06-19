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
  regularPrice: string;
  salePrice?: string;
  overview: string;
  description: string;
  image: StaticImageData;
}
