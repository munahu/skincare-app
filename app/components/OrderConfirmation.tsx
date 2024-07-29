"use client";

import { useContext, useEffect } from "react";
import { CartContextType, CartItemsContext } from "./Layout";
import { Prisma } from "@prisma/client";
import OrderSummary from "./OrderSummary";

export default function OrderConfirmation({
  order,
}: {
  order: Prisma.OrderGetPayload<{ include: { orderedProducts: true } }>;
}) {
  const { cartItems, updateCartItems } = useContext(
    CartItemsContext
  ) as CartContextType;

  useEffect(() => {
    if (cartItems.length > 0) {
      updateCartItems([]);
    }
  }, [cartItems, updateCartItems]);

  return (
    <div className="pt-24 sm:max-w-[600px] sm:m-auto">
      <div className="px-3">
        <h2 className="mb-4 capitalize font-semibold text-3xl sm:text-4xl max-w-1/2">
          Order sent!
        </h2>
        <p className="text-sm sm:text-base">
          We have received your order and it is being processed.
        </p>
      </div>
      <div className="bg-white p-7 pt-9 mt-6 sm:rounded-lg">
        <OrderSummary
          orderStatus="completed"
          productList={order.orderedProducts}
          productListCount={order.productCount}
          totalCost={order.totalCost}
          totalSavings={order.totalSavings ?? undefined}
        />
      </div>
    </div>
  );
}
