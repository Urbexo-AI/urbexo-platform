"use client";

import { useState } from "react";
import VariantSelector from "./VariantSelector";

export default function ProductInfo({ product }) {
  const variants = product.variants?.edges || [];

 const firstVariant = realVariants[0] || variants?.[0]?.node;

const [selectedVariant, setSelectedVariant] =
  useState(firstVariant);

 async function handleAddToCart() {
  console.log("ADD TO CART CLICKED");

  if (!selectedVariant?.id) {
    console.error("No variant selected");
    return;
  }

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

  console.log("API RESPONSE:", data);

  if (data?.checkoutUrl) {
    window.location.href = data.checkoutUrl;
  } else {
    console.error("Missing checkoutUrl", data);
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
  onClick={() => {
    console.log("CLICK WORKS");
    alert("CLICK WORKS");
  }}
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
