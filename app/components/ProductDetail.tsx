import Image from "next/image";
import { Product, Size } from "@/app/types/product";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";
import ProductSizes from "./ProductSizes";

export default function ProductDetail({ product }: { product: Product }) {
  const {
    name,
    overview,
    tagline,
    description,
    sizes,
    regularPrice,
    salePrice,
    images,
  } = product;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0]);

  return (
    <>
      <div className="hidden md:flex mt-20 mb-8">
        <div className="w-1/2 mr-16 lg:mr-0 pl-2">
          <div className="max-w-[400px] lg:max-w-[450px] xl:max-w-[400px]">
            <h2 className="text-3xl font-semibold mb-2">{name}</h2>
            <p className="text-sm font-light">{overview}</p>
            {sizes && selectedSize && setSelectedSize && (
              <ProductSizes
                sizes={sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            )}
            <div className="flex flex-col">
              {salePrice && (
                <div className="text-sm mt-4 mb-6 bg-neutral-100 w-fit px-4 py-2 font-light tracking-wide">
                  Save ${regularPrice - salePrice} with this set
                </div>
              )}
              <AddToCartButton
                classname={`${
                  salePrice && `order-last`
                } mt-8 mb-6 w-full max-w-fit py-2 px-3 bg-neutral-100 flex justify-between border-b border-r border-black text-sm cursor-pointer`}
                product={product}
                selectedSize={selectedSize}
              >
                <>
                  <span className="mr-3">Add to bag</span>
                  <div>
                    {salePrice && (
                      <span className="mr-2">${salePrice} CAD</span>
                    )}
                    <span
                      className={`${salePrice && `line-through opacity-55`}`}
                    >
                      ${regularPrice} CAD
                    </span>
                  </div>
                </>
              </AddToCartButton>
              <div className="text-sm">
                <p className="mb-3 font-medium">{tagline}</p>
                <p className="font-light leading-6">{description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-1/2 xl:w-full xl:flex object-cover">
          <div className="xl:hidden absolute inset-0 bg-black z-10 opacity-10" />
          <Image
            alt={name}
            src={images[0]}
            className="absolute xl:static xl:w-1/2 bottom-3 left-4 w-1/3 z-20"
          />
          <Image
            alt={name}
            src={images[1]}
            className="xl:w-1/2 xl:pl-3"
            priority
          />
        </div>
      </div>
      <MobileLayout product={product} selectedSize={selectedSize} />
    </>
  );
}

function MobileLayout({
  product,
  selectedSize,
}: {
  product: Product;
  selectedSize?: Size;
}) {
  const {
    name,
    overview,
    sizes,
    regularPrice,
    salePrice,
    images,
    tagline,
    description,
  } = product;
  return (
    <div className="md:hidden mt-10 mb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-black z-10 opacity-10" />
        <Image
          alt={name}
          src={images[0]}
          className="absolute bottom-3 left-4 w-1/4 z-20"
        />
        <Image alt={name} src={images[1]} className="mb-3" priority />
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold mb-2">{name}</h2>
        <p className="text-sm">{overview}</p>
        {sizes && (
          <ul className="flex text-sm mt-5">
            {sizes.map((size, index) => (
              <li
                key={index}
                className={`${
                  sizes.length === 1
                    ? `w-24 sm:w-20`
                    : sizes.length === 2
                    ? `first:w-24 sm:first:w-20 last:w-28 sm:last:w-24`
                    : `first:w-24 sm:first:w-20 w-28 sm:w-24 last:w-32 sm:last:w-28`
                } relative first:border border-black py-2 text-center bg-neutral-100 italic cursor-pointer`}
              >
                {size.size}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col">
          {salePrice && (
            <div className="text-sm mt-4 mb-6 bg-neutral-100 w-fit px-4 py-2 font-light tracking-wide">
              Save ${regularPrice - salePrice} with this set
            </div>
          )}
          <AddToCartButton
            classname={`${
              salePrice && `order-last`
            } mt-8 mb-6 w-full py-2 px-5 bg-neutral-100 flex justify-between border-b border-r border-black text-sm`}
            product={product}
            selectedSize={selectedSize}
          >
            <>
              <span className="mr-3">Add to bag</span>
              <div>
                {salePrice && <span className="mr-2">${salePrice} CAD</span>}
                <span className={`${salePrice && `line-through opacity-55`}`}>
                  ${regularPrice} CAD
                </span>
              </div>
            </>
          </AddToCartButton>
          <div className="text-sm">
            <p className="mb-3 font-medium">{tagline}</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
