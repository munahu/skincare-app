"use server";

import { OrderedProduct } from "@prisma/client";
import { redirect } from "next/navigation";
import { CartContextInfo } from "./components/Layout";
import prisma from "./lib/client";

export const updateUser = async (userId: string, formData: FormData) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: `${firstName} ${lastName}`,
    },
  });
};

export const createGuestOrder = async (
  cartInfo: CartContextInfo,
  checkoutId: string,
  formData: FormData
) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = String(formData.get("email"));
  const addressLine1 = String(formData.get("addressLine1"));
  const addressLine2 = String(formData.get("addressLine2"));
  const city = String(formData.get("city"));
  const province = String(formData.get("province"));
  const postalCode = String(formData.get("postalCode"));

  const { cartItems, cartCount, totalCost, totalSavings } = cartInfo;

  const orderedProducts: OrderedProduct[] = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    regularPrice: item.regularPrice,
    salePrice: item.salePrice ?? null,
    image: JSON.stringify(item.images[0]),
    quantity: item.quantity,
    selectedSize: item.selectedSize?.size ?? null,
  }));

  await prisma.order.create({
    data: {
      id: checkoutId,
      guestName: `${firstName} ${lastName}`,
      guestEmail: email,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      productCount: cartCount,
      totalCost,
      totalSavings,
      orderedProducts: {
        connectOrCreate: orderedProducts.map((product) => ({
          where: {
            id: product.id,
          },
          create: {
            id: product.id,
            name: product.name,
            regularPrice: product.regularPrice,
            salePrice: product.salePrice,
            image: product.image,
            quantity: product.quantity,
            selectedSize: product.selectedSize,
          },
        })),
      },
    },
  });
  redirect(`/checkouts/${checkoutId}`);
};

export const createUserOrder = async (
  userId: string,
  cartInfo: CartContextInfo,
  checkoutId: string,
  formData: FormData
) => {
  const addressLine1 = String(formData.get("addressLine1"));
  const addressLine2 = String(formData.get("addressLine2"));
  const city = String(formData.get("city"));
  const province = String(formData.get("province"));
  const postalCode = String(formData.get("postalCode"));

  const { cartItems, cartCount, totalCost, totalSavings } = cartInfo;

  const orderedProducts: OrderedProduct[] = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    regularPrice: item.regularPrice,
    salePrice: item.salePrice ?? null,
    image: JSON.stringify(item.images[0]),
    quantity: item.quantity,
    selectedSize: item.selectedSize?.size ?? null,
  }));

  await prisma.order.create({
    data: {
      id: checkoutId,
      userId,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      productCount: cartCount,
      totalCost,
      totalSavings,
      orderedProducts: {
        connectOrCreate: orderedProducts.map((product) => ({
          where: {
            id: product.id,
          },
          create: {
            id: product.id,
            name: product.name,
            regularPrice: product.regularPrice,
            salePrice: product.salePrice,
            image: product.image,
            quantity: product.quantity,
            selectedSize: product.selectedSize,
          },
        })),
      },
    },
  });
  redirect(`/checkouts/${checkoutId}`);
};

export const getOrderById = async (orderId: string) =>
  await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderedProducts: true,
    },
  });

export const getUserOrders = async (userId: string) =>
  await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderedProducts: true,
    },
  });
