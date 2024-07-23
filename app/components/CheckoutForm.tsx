"use client";

import Logo from "../components/Logo";
import { FormHeading, FormInput } from "../components/FormElements";
import Link from "next/link";
import OrderSummary from "../components/OrderSummary";
import { User } from "next-auth";
import { createUserOrder, createGuestOrder } from "../actions";
import { useContext } from "react";
import { CartContextInfo, CartItemsContext } from "./Layout";
import { notFound, useParams } from "next/navigation";

export default function CheckoutForm({ user }: { user?: User }) {
  const params = useParams();

  const storedCheckoutId = localStorage.getItem("checkoutId");

  const { cartItems, cartCount, totalCost, totalSavings } = useContext(
    CartItemsContext
  ) as CartContextInfo;

  const { name, email } = user || {};
  const firstName = name?.split(" ")[0];
  const lastName = name?.split(" ").slice(1).join(" ");

  const createUserOrderWithIdAndCartInfo = createUserOrder.bind(
    null,
    String(user?.id),
    {
      cartItems,
      cartCount,
      totalCost,
      totalSavings,
    }
  );

  const createGuestOrderWithCartInfo = createGuestOrder.bind(null, {
    cartItems,
    cartCount,
    totalCost,
    totalSavings,
  });

  if (params.id === storedCheckoutId) {
    return (
      <form
        className="lg:flex"
        action={
          user ? createUserOrderWithIdAndCartInfo : createGuestOrderWithCartInfo
        }
      >
        <div className="lg:w-[55%] lg:border-r border-neutral-300 lg:bg-white">
          <FormSection className="lg:pl-10 xl:pl-40 lg:pr-10 lg:pb-8">
            <Logo className="text-4xl" />
          </FormSection>
          <FormSection className="lg:pl-10 xl:pl-40 lg:pr-10">
            <>
              <div className="flex flex-wrap items-center justify-between">
                <FormHeading text="Contact information" type="checkout" />
                {!user && (
                  <Link className="underline text-xs mb-4" href="/account">
                    Log in
                  </Link>
                )}
              </div>
              <FormInput
                label="Email"
                name="email"
                type="email"
                defaultValue={email ?? ""}
              />
            </>
          </FormSection>
          <FormSection className="lg:pl-10 xl:pl-40 lg:pr-10 pb-12">
            <>
              <FormHeading text="Delivery" type="checkout" />
              <FormInput
                label="Country"
                name="country"
                type="text"
                defaultValue="Canada"
                isDisabled
              />
              <FormInput
                label="First name"
                name="firstName"
                type="text"
                defaultValue={firstName}
              />
              <FormInput
                label="Last name"
                name="lastName"
                type="text"
                defaultValue={lastName}
              />
              <FormInput label="Address" name="addressLine1" type="text" />
              <FormInput
                label="Apt / Floor / Suite"
                name="addressLine2"
                type="text"
                isOptional
              />
              <div className="sm:grid grid-cols-3 gap-3">
                <FormInput label="City" name="city" type="text" />
                <div className="relative mb-3 flex flex-col border border-neutral-200">
                  <label
                    className="order-first opacity-55 cursor-text absolute left-2 top-2 text-[10px]"
                    htmlFor="province"
                  >
                    Province
                  </label>
                  <select
                    className="h-[52px] pl-2 pt-5 outline-none text-sm disabled:opacity-65 border-r-8 border-transparent appearance-none"
                    name="province"
                    id="province"
                  >
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                  </select>
                </div>
                <FormInput label="Postal code" name="postalCode" type="text" />
              </div>
            </>
          </FormSection>
        </div>
        <OrderSummary
          cartCount={cartCount}
          cartItems={cartItems}
          totalCost={totalCost}
          totalSavings={totalSavings}
        />
      </form>
    );
  } else {
    notFound();
  }
}

export function FormSection({
  children,
  className = "",
}: {
  children: JSX.Element;
  className?: string;
}) {
  return (
    <fieldset
      className={`pt-8 pb-8 px-4 mb-3 m-auto lg:mb-0 bg-white max-w-[570px] lg:max-w-none ${
        className ?? ""
      }`}
    >
      {children}
    </fieldset>
  );
}
