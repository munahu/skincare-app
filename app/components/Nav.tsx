"use client";

import Link from "next/link";
import { products, tags } from "../products";
import { usePathname } from "next/navigation";
import { Product, Tag } from "../types/product";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProductCard } from "./ProductGrid";
import { CartDisplayContext } from "./Layout";
import Cart, { CartCount } from "./Cart";

export default function Nav() {
  const pathname = usePathname();

  const isSelectedTag = (tag: Tag) => pathname.includes(tag);
  const isNoTagSelected = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { isCartOpen, setIsCartOpen } = useContext(CartDisplayContext) || {};

  return (
    <nav className="fixed inset-x-0 z-40 bg-white">
      <ul className="flex justify-end lg:justify-center items-center h-10 pl-4 border-b border-neutral-200 tracking-tight text-xs uppercase relative">
        <Link
          href="/"
          className="absolute left-5 font-semibold italic text-lg capitalize cursor-pointer"
        >
          <span>Skincare</span>
        </Link>
        <ul className="hidden lg:flex justify-center items-center">
          <li>
            <Link href="/" className={`mr-5 ${isNoTagSelected && `underline`}`}>
              All skincare
            </Link>
          </li>
          {tags.map((tag, index) => (
            <li key={index}>
              <Link
                href={`/${tag}`}
                className={`mr-5 ${isSelectedTag(tag) && `underline`}`}
              >
                {tag === "sets" ? "Save with sets" : tag}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="absolute right-2 flex justify-end">
          {isMenuOpen ? (
            <li>
              <svg
                onClick={() => setIsMenuOpen(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mr-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </li>
          ) : (
            <>
              <li
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden mr-4 cursor-pointer hover:underline"
              >
                Menu
              </li>
              <li
                onClick={() => setIsSearchOpen(true)}
                className="mr-4 cursor-pointer hover:underline"
              >
                Search
              </li>
              <li
                onClick={() => setIsCartOpen?.(true)}
                className="cursor-pointer hover:underline"
              >
                <CartCount />
              </li>
            </>
          )}
        </ul>
      </ul>
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      {isSearchOpen && (
        <>
          <Search setIsSearchOpen={setIsSearchOpen} />
          <div
            onClick={() => setIsSearchOpen(false)}
            className="fixed w-full h-screen bg-neutral-800 opacity-80 z-40"
          />
        </>
      )}
      {isCartOpen && setIsCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
    </nav>
  );
}

function Menu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const menuRefCurrent = menuRef.current;

    const handleMouseLeave = () => {
      const timeoutId = window.setTimeout(() => {
        setIsMenuOpen(false);
      }, 200);

      return () => {
        clearTimeout(timeoutId);
      };
    };

    if (menuRefCurrent) {
      menuRefCurrent.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (menuRefCurrent) {
        menuRefCurrent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [setIsMenuOpen]);

  return (
    <ul
      ref={menuRef}
      className="pt-3 block lg:hidden text-sm pl-8 border-b border-neutral-200"
    >
      <li className="mb-3">
        <Link href="/" className="">
          All skincare
        </Link>
      </li>
      {tags.map((tag, index) => (
        <li key={index} className="mb-3">
          <Link
            href={`/${tag}`}
            className={`${tag !== "sets" && `capitalize`}`}
          >
            {tag === "sets" ? "Save with sets" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Search({
  setIsSearchOpen,
}: {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (query: string) => {
    setQuery(query);
    if (query) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.overview.toLowerCase().includes(query.toLowerCase())
      );
      setResults(results.splice(0, 5));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="h-dvh lg:h-fit overflow-y-scroll pb-10">
      <form className="px-4 mt-3">
        <div className="bg-neutral-100 my-4 flex flex-col h-14 pl-3 relative">
          <svg
            onClick={() => setIsSearchOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="size-6 absolute -top-3 -right-2 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <label
            htmlFor="search"
            className="absolute top-3 text-[10px] opacity-50 tracking-tight"
          >
            Search
          </label>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            className="h-full outline-none pt-6 text-sm bg-neutral-100 placeholder:pl-2 placeholder:text-[11px]"
            id="search"
            type="search"
            placeholder="Search for a keyword"
            autoComplete="off"
          />
          <span
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 bottom-2 text-sm opacity-40 cursor-pointer"
          >
            Clear
          </span>
        </div>
      </form>
      {results.length > 0 && (
        <ul className="grid grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-5 px-4 pb-8">
          {results.map((result) => (
            <ProductCard key={result.id} product={result} />
          ))}
        </ul>
      )}
      {query.length > 0 && results.length === 0 && (
        <p className="px-6 text-sm opacity-55">
          Your search for &quot;{query}&quot; didn&apos;t return any results :(
        </p>
      )}
    </div>
  );
}
