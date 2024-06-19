import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  regularPrice: string;
  salePrice?: string;
  overview: string;
  description: string;
  image: StaticImageData;
}
