import { products } from "@/app/products";
import { Product } from "@/app/types/product";
import Image from "next/image";

interface Props {
  product: Product;
}

export default function ProductGrid() {
  return (
    <ul>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}

function ProductCard({ product }: Props) {
  const { name, regularPrice, salePrice, overview, image } = product;
  return (
    <li>
      {image && <Image alt={name} src={image} />}
      <a href="">{name}</a>
      <p>{overview}</p>
      <p>{regularPrice}</p>
      {salePrice && <p>{salePrice}</p>}
    </li>
  );
}
