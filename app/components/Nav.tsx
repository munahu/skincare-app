"use client";

import Link from "next/link";
import { tags } from "../products";
import { usePathname } from "next/navigation";
import { Tag } from "../types/product";

export default function Nav() {
  const pathname = usePathname();

  const isSelectedTag = (tag: Tag) => pathname.includes(tag);
  const isNoTagSelected = pathname === "/";

  return (
    <nav>
      <ul className="flex justify-center items-center py-3 mb-8 pl-4 border border-x-0 border-b-neutral-200 tracking-tight text-xs uppercase">
        <Link href="/" className={`mr-5 ${isNoTagSelected && `underline`}`}>
          All skincare
        </Link>
        {tags.map((tag, index) => (
          <Link
            href={`/${tag}`}
            className={`mr-5 ${isSelectedTag(tag) && `underline`}`}
            key={index}
          >
            {tag === "sets" ? "Save with sets" : tag}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
