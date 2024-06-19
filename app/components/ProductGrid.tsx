import { products } from "@/app/products";
import { Product } from "@/app/types/product";
import Image from "next/image";

interface Props {
  product: Product;
}

export default function ProductGrid() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}

function ProductCard({ product }: Props) {
  const { name, regularPrice, salePrice, overview, image, set, sizes } =
    product;
  return (
    <li className="relative text-xs sm:text-sm">
      {image && <Image alt={name} src={image} className="mb-3" />}
      <a href="">{name}</a>
      <p className="mt-1 mb-2 opacity-65">{overview}</p>
      <div className="flex">
        <p className="mr-2">{regularPrice}</p>
        {salePrice && <p className="line-through opacity-55">{salePrice}</p>}
      </div>
      {sizes && (
        <ul className="flex flex-wrap max-w-56 mt-4 -mb-5">
          {sizes.map((size, index) => (
            <li
              key={index}
              className={`${
                sizes.length === 1
                  ? `w-24 sm:w-20`
                  : sizes.length === 2
                  ? `first:w-24 sm:first:w-20 last:w-28 sm:last:w-24`
                  : `first:w-24 sm:first:w-20 w-28 sm:w-24 last:w-32 sm:last:w-28`
              } relative first:border border-black py-3 text-center bg-neutral-100 italic cursor-pointer`}
            >
              {size}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-16">
        <button className="absolute bottom-0 border border-r-black border-b-black border-t-0  border-l-0 w-full h-9">
          {set ? "Choose set" : "Add to bag"}
        </button>
      </div>
    </li>
  );
}
