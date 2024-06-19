import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  set?: boolean;
  sizes?: string[];
  name: string;
  regularPrice: string;
  salePrice?: string;
  overview: string;
  description: string;
  image: StaticImageData;
}
