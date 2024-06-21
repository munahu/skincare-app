"use client";

import { products } from "@/app/products";
import { Product, Tag } from "@/app/types/product";
import Image from "next/image";
import { useContext } from "react";
import { CartDisplayContext, CartItemsContext } from "./Layout";

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
        <ul className="mb-5 px-2 text-sm flex justify-between opacity-55">
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
  const { name, regularPrice, salePrice, overview, image, set, sizes } =
    product;
  const { cartItems, updateCartItems } = useContext(CartItemsContext) || {};
  const { setIsCartOpen } = useContext(CartDisplayContext) || {};

  const handleAddClick = () => {
    if (cartItems) {
      const duplicateProductIndex = cartItems.findIndex(
        (item) => item.id === product.id
      );
      if (duplicateProductIndex === -1) {
        updateCartItems?.([...cartItems, { ...product, quantity: 1 }]);
      } else {
        cartItems[duplicateProductIndex].quantity += 1;
        updateCartItems?.(cartItems);
      }
      setIsCartOpen?.(true);
    }
  };

  return (
    <li className="relative text-xs sm:text-sm">
      {image && <Image alt={name} src={image} className="mb-3" />}
      <a href="">{name}</a>
      <p className="mt-1 mb-2 opacity-65">{overview}</p>
      <div className="flex">
        <p className="mr-2">${regularPrice}</p>
        {salePrice && <p className="line-through opacity-55">${salePrice}</p>}
      </div>
      {isInProductGrid && (
        <>
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
            <button
              onClick={() => handleAddClick()}
              className="absolute bottom-0 border-r border-b border-black w-full h-9 cursor-pointer"
            >
              {set ? "Choose set" : "Add to bag"}
            </button>
          </div>
        </>
      )}
    </li>
  );
}
