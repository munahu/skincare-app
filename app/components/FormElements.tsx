import { HTMLInputTypeAttribute } from "react";

export function FormInput({
  label,
  name,
  type,
  defaultValue,
  isDisabled,
  isOptional,
  className,
}: {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  defaultValue?: string;
  isDisabled?: boolean;
  isOptional?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative mb-3 flex flex-col border border-neutral-200 rounded-md ${
        className ?? ""
      }`}
    >
      <input
        required={!isOptional}
        autoComplete="off"
        className={`h-12 pl-2 pt-5 placeholder-shown:pt-0 outline-none text-sm disabled:opacity-65 rounded-md ${
          name === `postalCode` ? `uppercase` : ``
        } peer`}
        type={type}
        name={name}
        id={name}
        placeholder=""
        defaultValue={defaultValue}
        disabled={isDisabled}
        maxLength={name === "postalCode" ? 6 : undefined}
      />
      <label
        className="order-first opacity-55 cursor-text absolute inset-x-0 left-2 top-2 text-[10px] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}

export function FormHeading({
  text,
  type = "account",
  className,
}: {
  text: string;
  type?: "checkout" | "account";
  className?: string;
}) {
  return (
    <h2
      className={`${
        type === "checkout"
          ? `mb-4 capitalize font-semibold text-2xl max-w-1/2`
          : `mb-6 text-[28px] lg:text-3xl tracking-wide`
      } ${className ?? ""}`}
    >
      {text}
    </h2>
  );
}
