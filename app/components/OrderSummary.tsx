"use client";

import { useState } from "react";
import { CartContextInfo } from "./Layout";
import { FormSection } from "./CheckoutForm";
import { CartItem } from "../types/product";
import Image from "next/image";
import { Price } from "./Cart";
import { FormHeading } from "./FormElements";

export default function OrderSummary({
  cartItems,
  cartCount,
  totalCost,
  totalSavings,
}: CartContextInfo) {
  return (
    <FormSection className="lg:w-[45%] lg:pt-0 lg:mt-14 lg:pl-8 lg:pr-10 xl:pr-40 lg:bg-neutral-100">
      <>
        {!!totalCost && (
          <>
            <MobileLayout cartItems={cartItems} cartCount={cartCount} />
            <DesktopLayout cartItems={cartItems} />
            <div className="flex justify-between text-sm mt-12 mb-4 font-medium mx-1">
              <p>Subtotal</p>
              <Price price={totalCost} addZeros />
            </div>
            <div className="flex justify-between text-sm font-medium mx-1 mb-10">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between text-xl font-semibold">
              <p>Total</p>
              <Price price={totalCost} addZeros />
            </div>
            {!!totalSavings && (
              <div className="mt-2 flex items-center text-sm font-semibold">
                <p className="flex uppercase items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4 mr-1 rotate-90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>
                  <span className="mr-2">Total savings</span>
                </p>
                <Price price={totalSavings} addZeros />
              </div>
            )}
            <button className="w-full block bg-black text-white py-4 mt-10 mb-2.5 rounded-md text-center text-sm">
              Place order
            </button>
          </>
        )}
      </>
    </FormSection>
  );
}

function ItemList({ cartItems }: { cartItems?: CartItem[] }) {
  return (
    <ul>
      {cartItems?.map(
        ({
          id,
          name,
          images,
          regularPrice,
          salePrice,
          quantity,
          selectedSize,
        }) => (
          <li key={id} className="w-full flex mb-5 text-sm font-medium lg:mb-8">
            <div className="relative mr-4 sm:mr-3">
              <Image
                alt={name}
                src={images[0]}
                className="aspect-square object-cover w-20 lg:w-16 bg-neutral-100 px-2 border border-neutral-300 rounded-md"
              />
              <span className="absolute -top-4 -right-3 bg-neutral-700 w-6 h-6 flex items-center justify-center rounded-full opacity-70 text-white font-medium text-xs ">
                {quantity}
              </span>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center h-full">
                <div className="flex flex-col mr-3 max-w-1/2">
                  <span className="flex flex-wrap">{name}</span>
                  {selectedSize?.size && (
                    <span className="mt-3 mb-2.5 opacity-55 text-xs font-normal">
                      {selectedSize.size}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`${
                      salePrice && `-mt-[23px] line-through opacity-55`
                    }`}
                  >
                    <Price price={regularPrice * quantity} addZeros />
                  </span>
                  {salePrice && <Price price={salePrice * quantity} addZeros />}
                </div>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}

function MobileLayout({
  cartItems,
  cartCount,
}: {
  cartItems?: CartItem[];
  cartCount?: number;
}) {
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);
  return (
    <div className="lg:hidden">
      <div
        onClick={() => setIsOrderDisplayed(!isOrderDisplayed)}
        className="flex items-center justify-between mb-8 cursor-pointer"
      >
        <div className="flex items-center">
          <FormHeading text="Order summary" className="mr-2" type="checkout" />
          <FormHeading text={`(${cartCount})`} type="checkout" />
        </div>
        <div className="flex items-center text-sm mb-4">
          <p>{isOrderDisplayed ? `Hide` : `Show`}</p>
          {isOrderDisplayed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-3 ml-2.5 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-3 ml-2.5 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </div>
      </div>
      {isOrderDisplayed && <ItemList cartItems={cartItems} />}
    </div>
  );
}

function DesktopLayout({ cartItems }: { cartItems?: CartItem[] }) {
  return (
    <div className="hidden lg:block lg:w-full">
      <ItemList cartItems={cartItems} />
    </div>
  );
}
