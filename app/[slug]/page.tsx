"use client";

import { notFound, useParams } from "next/navigation";
import ProductGrid from "@/app/components/ProductGrid";
import { Tag } from "@/app/types/product";
import { tags } from "@/app/products";
import Layout from "@/app/components/Layout";

export default function Page() {
  const { slug } = useParams();

  const isTag = tags.includes(slug as Tag);

  if (isTag) {
    return (
      <Layout>
        <ProductGrid tag={slug as Tag} />
      </Layout>
    );
  } else {
    notFound();
  }
}
