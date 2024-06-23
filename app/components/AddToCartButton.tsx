import { useContext } from "react";
import { CartDisplayContext, CartItemsContext } from "./Layout";
import { Product, Size } from "../types/product";

interface Props {
  classname: string;
  product: Product;
  children?: JSX.Element;
  selectedSize?: Size;
}

export default function AddToCartButton({
  classname,
  children,
  product,
  selectedSize,
}: Props) {
  const { cartItems, updateCartItems } = useContext(CartItemsContext) || {};
  const { setIsCartOpen } = useContext(CartDisplayContext) || {};

  const handleAddSelectedSize = () => {
    if (cartItems) {
      const productWithSelectedSize = cartItems.find(
        (item) => item.id === `${product.id}${selectedSize?.size}`
      );
      if (productWithSelectedSize) {
        productWithSelectedSize.quantity += 1;
      } else {
        cartItems.push({
          ...product,
          selectedSize,
          id: `${product.id}${selectedSize?.size}`,
          quantity: 1,
          regularPrice: Number(selectedSize?.price),
        });
      }

      updateCartItems?.([...cartItems]);
      setIsCartOpen?.(true);
    }
  };

  const handleAddClick = () => {
    if (selectedSize) {
      handleAddSelectedSize();
    } else {
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
    }
  };
  return (
    <button onClick={() => handleAddClick()} className={classname}>
      {children && children}
    </button>
  );
}
