"use client";

import { products } from "@/app/products";
import { Product, Tag } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import ProductSizes from "./ProductSizes";
import { useState } from "react";

interface Props {
  tag?: Tag;
}

export default function ProductGrid({ tag }: Props) {
  const productsToDisplay = tag
    ? products.filter((product) => product.tags.includes(tag))
    : products;

  return (
    <>
      <div className="pt-8">
        <ul className="mb-5 text-sm flex justify-between opacity-55">
          <li>
            <span>{productsToDisplay.length} items</span>
          </li>
        </ul>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8">
          {productsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} isInProductGrid />
          ))}
        </ul>
      </div>
    </>
  );
}

export function ProductCard({
  product,
  isInProductGrid,
}: {
  product: Product;
  isInProductGrid?: boolean;
}) {
  const { id, name, regularPrice, salePrice, overview, images, sizes } =
    product;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0]);

  return (
    <li className="relative text-xs sm:text-sm">
      {images && (
        <Link href={`/products/${id}`}>
          <Image alt={name} src={images[0]} className="mb-3" />
        </Link>
      )}
      <a href="">{name}</a>
      <p className="mt-1 mb-2 opacity-65">{overview}</p>
      <div className="flex">
        <p className="mr-2">${selectedSize?.price ?? regularPrice}</p>
        {salePrice && <p className="line-through opacity-55">${salePrice}</p>}
      </div>
      {isInProductGrid && (
        <>
          {sizes && selectedSize && setSelectedSize && (
            <ProductSizes
              sizes={sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              isInProductGrid
            />
          )}
          <div className="mt-16">
            <AddToCartButton
              classname="absolute bottom-0 border-r border-b border-black w-full h-9 cursor-pointer"
              product={product}
              selectedSize={selectedSize}
            >
              <>Add to bag</>
            </AddToCartButton>
          </div>
        </>
      )}
    </li>
  );
}
