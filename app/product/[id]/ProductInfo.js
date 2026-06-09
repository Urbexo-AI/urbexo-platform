"use client";

import { useState } from "react";
import VariantSelector from "./VariantSelector";

export default function ProductInfo({ product }) {
  const variants = product.variants?.edges || [];

  const realVariants = variants
    .map((v) => v.node)
    .filter((v) => v.title !== "Default Title");

  const fallbackVariant = {
    id: variants?.[0]?.node?.id,
    price: {
      amount:
        product.priceRange?.minVariantPrice?.amount || 0,
    },
  };

  const [selectedVariant, setSelectedVariant] =
    useState(realVariants[0] || fallbackVariant);

  async function handleAddToCart() {
    if (!selectedVariant?.id) return;

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variantId: selectedVariant.id,
      }),
    });

    const data = await res.json();

    if (data?.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    }
  }

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
        onSelect={(v) => setSelectedVariant(v)}
      />

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>

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
