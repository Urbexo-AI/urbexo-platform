"use client";

import { useState } from "react";
import VariantSelector from "./VariantSelector";

export default function ProductInfo({ product }) {
  const variants = product.variants?.edges || [];

  const realVariants = variants
    .map((v) => v.node)
    .filter((v) => v.title !== "Default Title");

  const defaultVariant =
    realVariants[0] || {
      price: {
        amount:
          product.priceRange?.minVariantPrice?.amount || 0,
      },
    };

  const [selectedVariant, setSelectedVariant] =
    useState(defaultVariant);

  return (
    <div>
      <h1>{product.title}</h1>

      <p style={{ color: "#666" }}>
        Vendor: {product.vendor}
      </p>

      <p
        style={{
          fontSize: "22px",
          marginTop: "10px",
          fontWeight: "bold",
        }}
      >
        $
        {Number(
          selectedVariant?.price?.amount || 0
        ).toFixed(2)}
      </p>

      <VariantSelector
        variants={variants}
        onSelect={(variant) =>
          setSelectedVariant(variant)
        }
      />

      <div
        style={{
          marginTop: "20px",
          color: "#444",
          lineHeight: "1.6",
        }}
        dangerouslySetInnerHTML={{
          __html: product.descriptionHtml || "",
        }}
      />
    </div>
  );
}
