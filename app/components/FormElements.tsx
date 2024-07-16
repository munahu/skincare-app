import { HTMLInputTypeAttribute } from "react";

export function FormInput({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
}) {
  return (
    <div className="relative mb-3 flex flex-col border border-neutral-200">
      <input
        required
        autoComplete="off"
        className="h-12 pl-2 pt-5 placeholder-shown:pt-0 outline-none text-sm peer"
        type={type}
        name={name}
        id={name}
        placeholder=""
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

export function FormHeading({ text }: { text: string }) {
  return <h2 className="text-[28px] lg:text-3xl mb-6 tracking-wide">{text}</h2>;
}
