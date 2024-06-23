import { Dispatch, SetStateAction } from "react";
import { Size } from "../types/product";

export default function ProductSizes({
  selectedSize,
  setSelectedSize,
  sizes,
  isInProductGrid,
}: {
  selectedSize: Size;
  setSelectedSize: Dispatch<SetStateAction<Size | undefined>>;
  sizes: Size[];
  isInProductGrid?: boolean;
}) {
  return (
    <ul
      className={`flex text-sm mt-5 ${
        isInProductGrid && `flex-wrap max-w-56 mt-4 -mb-5`
      }`}
    >
      {sizes.map((size, index) => (
        <li
          onClick={() => setSelectedSize(size)}
          key={index}
          className={`${
            sizes.length === 1
              ? `w-24 sm:w-20`
              : sizes.length === 2
              ? `first:w-24 sm:first:w-20 last:w-28 sm:last:w-24`
              : `first:w-24 sm:first:w-20 w-28 sm:w-24 last:w-32 sm:last:w-28`
          } relative ${size === selectedSize && `border border-black`} ${
            isInProductGrid ? `py-3` : `py-2`
          } text-center bg-neutral-100 italic cursor-pointer`}
        >
          {size.size}
        </li>
      ))}
    </ul>
  );
}
