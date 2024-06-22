import { useContext } from "react";
import { CartDisplayContext, CartItemsContext } from "./Layout";
import { Product } from "../types/product";

interface Props {
  classname: string;
  product: Product;
  children?: JSX.Element;
}

export default function AddToCartButton({
  classname,
  children,
  product,
}: Props) {
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
    <button onClick={() => handleAddClick()} className={classname}>
      {children && children}
    </button>
  );
}
