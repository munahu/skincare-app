import { Dispatch, SetStateAction, useContext } from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "../types/product";
import { CartItemsContext } from "./Layout";

export default function Cart({
  setIsCartOpen,
}: {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { cartItems, updateCartItems } = useContext(CartItemsContext) || {};

  const handleRemoveClick = (itemId: string) => {
    const updatedCartItems = cartItems?.filter((item) => item.id !== itemId);
    if (updatedCartItems) {
      updateCartItems?.(updatedCartItems);
    }
  };

  const handleIncreaseQuantityClick = (itemId: string) => {
    if (cartItems) {
      const itemIndex = cartItems.findIndex((item) => item.id === itemId);
      cartItems[itemIndex].quantity += 1;
      const updatedCartItems = [...cartItems];
      updateCartItems?.(updatedCartItems);
    }
  };

  const handleDecreaseQuantityClick = (itemId: string) => {
    if (cartItems) {
      const itemIndex = cartItems.findIndex((item) => item.id === itemId);
      const cartItem = cartItems[itemIndex];
      if (cartItem.quantity > 1) {
        cartItems[itemIndex].quantity -= 1;
        const updatedCartItems = [...cartItems];
        updateCartItems?.(updatedCartItems);
      } else if (cartItem.quantity === 1) {
        cartItems[itemIndex].quantity -= 1;
        handleRemoveClick(itemId);
      }
    }
  };

  const totalSavings = cartItems?.reduce(
    (totalSavings, item) =>
      totalSavings +
      (item.regularPrice - (item.salePrice ?? item.regularPrice)) *
        item.quantity,
    0
  );

  const costs = cartItems?.map(
    (item) => item.quantity * (item.salePrice ?? item.regularPrice)
  ) as number[];

  const sum = costs.reduce((total, current) => total + current, 0);

  return (
    <>
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 h-screen bg-neutral-800 opacity-70 z-40"
      />
      <div className="fixed overflow-y-scroll inset-y-0 right-0 h-full bg-white z-50 pt-2 w-full md:max-w-[540px]">
        <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
          <span className="font-semibold italic text-lg capitalize pl-4">
            Skincare
          </span>
          <div className="flex items-center uppercase text-xs">
            <CartCount />
            <svg
              onClick={() => setIsCartOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-4 mr-5 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="px-4 pt-2 text-xs">
          <span className="uppercase">Shopping bag</span>
        </div>
        {cartItems && cartItems.length > 0 ? (
          <>
            <ul className="mt-1 mb-4 flex flex-col text-sm">
              {cartItems?.map((item) => (
                <CartItem
                  key={item.id}
                  cartItem={item}
                  handleRemoveClick={handleRemoveClick}
                  handleIncreaseQuantityClick={handleIncreaseQuantityClick}
                  handleDecreaseQuantityClick={handleDecreaseQuantityClick}
                />
              ))}
            </ul>
            <div className="mb-8 text-sm font-light">
              <div className="flex justify-between bg-neutral-100 py-3 px-6">
                <span>Subtotal</span>
                <Price price={sum} />
              </div>
              {!!totalSavings && (
                <div className="flex justify-between bg-neutral-50 py-3 px-6">
                  <span>Savings</span>
                  <Price price={totalSavings} isSavings />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="px-4 mt-6">
            <p className="text-2xl">Your cart is empty.</p>
          </div>
        )}
      </div>
    </>
  );
}

function CartItem({
  cartItem,
  handleRemoveClick,
  handleIncreaseQuantityClick,
  handleDecreaseQuantityClick,
}: {
  cartItem: CartItemType;
  handleRemoveClick: (productId: string) => void;
  handleIncreaseQuantityClick: (productId: string) => void;
  handleDecreaseQuantityClick: (productId: string) => void;
}) {
  const { id, name, images, regularPrice, salePrice, quantity } = cartItem;
  return (
    <li className="border-t last:border-b border-black w-full flex py-4 px-4">
      <Image alt={name} src={images[0]} className="max-w-20 mr-2 sm:mr-3" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between h-full">
          <div className="flex mr-4">
            <span>{name}</span>
          </div>
          <div className="flex">
            <span className={`mr-1 ${salePrice && `line-through opacity-55`}`}>
              <Price price={regularPrice * quantity} />
            </span>
            {salePrice && <Price price={salePrice * quantity} />}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex w-1/2">
            <button onClick={() => handleDecreaseQuantityClick(id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <button className="mx-4">{quantity}</button>
            <button onClick={() => handleIncreaseQuantityClick(id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={() => handleRemoveClick(id)}
            className="text-xs underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export function CartCount() {
  const { cartCount } = useContext(CartItemsContext) || {};
  return <span className="mr-4">Bag ({cartCount})</span>;
}

function Price({ price, isSavings }: { price: number; isSavings?: boolean }) {
  return (
    <span>
      {isSavings && <span>-</span>}${price.toFixed(2)} CAD
    </span>
  );
}
