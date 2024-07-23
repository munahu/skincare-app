import { Dispatch, SetStateAction, useContext } from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "../types/product";
import { CartItemsContext } from "./Layout";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { v4 as uuidv4 } from "uuid";

export default function Cart({
  setIsCartOpen,
}: {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems, updateCartItems, totalSavings, totalCost } =
    useContext(CartItemsContext) || {};

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

  return (
    <>
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 h-screen bg-neutral-800 opacity-70 z-40 cart"
      />
      <div className="fixed overflow-y-scroll inset-y-0 right-0 h-full bg-white z-50 pt-2 w-full md:max-w-[440px]">
        <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mx-3">
          <Logo
            className="text-lg"
            onClick={() => pathname === "/" && setIsCartOpen(false)}
          />
          <div className="flex items-center uppercase text-xs">
            <CartCount />
            <svg
              onClick={() => setIsCartOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-4 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        {cartItems && cartItems.length > 0 ? (
          <>
            <div className="h-[65%] overflow-y-scroll">
              <div className="mx-3 mt-2 text-xs">
                <span className="uppercase">Shopping bag</span>
              </div>
              <ul className="mt-1 flex flex-col text-sm pb-6">
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
            </div>
            <div className="absolute bottom-10 inset-x-0">
              <div className="mb-4 text-sm">
                {totalCost && (
                  <div className="flex justify-between bg-neutral-100 py-3 px-3">
                    <span>Subtotal</span>

                    <Price price={totalCost} addZeros addCurrency />
                  </div>
                )}
                {!!totalSavings && (
                  <div className="flex justify-between bg-neutral-50 p-3">
                    <span>Savings</span>
                    <Price
                      price={totalSavings}
                      isSavings
                      addZeros
                      addCurrency
                    />
                  </div>
                )}
              </div>
              <div className="mx-3">
                <button
                  onClick={() => {
                    const checkoutId = uuidv4();
                    localStorage.setItem("checkoutId", checkoutId);
                    router.push(`/checkouts/${checkoutId}`);
                  }}
                  className="w-full block bg-black text-white py-3 mb-2.5 text-center text-sm"
                >
                  Checkout
                </button>
                <p className="text-xs opacity-65">
                  Click above to review your items and complete your order.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="px-4 pt-2 text-xs">
              <span className="uppercase">Shopping bag</span>
            </div>
            <div className="px-4 mt-6">
              <p className="text-2xl">Your cart is empty.</p>
            </div>
          </>
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
  const {
    id,
    name,
    images,
    regularPrice,
    salePrice,
    quantity,
    selectedSize,
    overview,
  } = cartItem;
  return (
    <li className="border-t last:border-b border-black w-full flex p-2 md:p-3">
      <Image alt={name} src={images[0]} className="max-w-20 mr-2 sm:mr-3" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between h-full">
          <div className="flex flex-col mr-3 max-w-1/2">
            <span className="flex flex-wrap">{name}</span>
            <span className="mt-3 mb-2.5 opacity-55 text-xs">
              {selectedSize?.size ?? overview}
            </span>
          </div>
          <div className="flex">
            <span
              className={`${salePrice && `mr-1.5 line-through opacity-55`}`}
            >
              <Price price={regularPrice * quantity} addCurrency />
            </span>
            {salePrice && <Price price={salePrice * quantity} addCurrency />}
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

export function Price({
  price,
  isSavings,
  addZeros,
  addCurrency,
}: {
  price: number;
  isSavings?: boolean;
  addZeros?: boolean;
  addCurrency?: boolean;
}) {
  return (
    <span className="whitespace-nowrap">
      {isSavings && <span>-</span>}${addZeros ? price.toFixed(2) : price}
      {addCurrency && <span className="ml-1">CAD</span>}
    </span>
  );
}
