"use client";

import Layout from "@/app/components/Layout";
import { products } from "@/app/products";
import { notFound, useParams } from "next/navigation";
import ProductDetail from "@/app/components/ProductDetail";

export default function Page() {
  const { id } = useParams();
  const product = products.find((product) => product.id === id);

  if (product) {
    return (
      <Layout>
        <ProductDetail product={product} />
      </Layout>
    );
  } else {
    notFound();
  }
}
