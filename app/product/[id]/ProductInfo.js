"use client";

import { useState } from "react";
import VariantSelector from "./VariantSelector";

export default function ProductInfo({ product }) {
  const variants = product.variants?.edges || [];
  
  const realVariants = variants
  .map((v) => v.node)
  .filter((v) => v.title !== "Default Title");

 const firstVariant =
  realVariants[0] || variants?.[0]?.node || null;

const [selectedVariant, setSelectedVariant] =
  useState(firstVariant || null);

  const [quantity, setQuantity] = useState(1);

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
      quantity: quantity,
    }),
  });

  const data = await res.json();

  console.log("API RESPONSE:", data);

   if (data?.cartId) {
  localStorage.setItem(
    "shopifyCartId",
    data.cartId
  );
}

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
<div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
  
  <button
    onClick={() => setQuantity(q => Math.max(1, q - 1))}
    style={{
      padding: "6px 12px",
      border: "1px solid #ddd",
      background: "white",
      cursor: "pointer"
    }}
  >
    -
  </button>

  <span style={{ minWidth: "30px", textAlign: "center" }}>
    {quantity}
  </span>

  <button
    onClick={() => setQuantity(q => q + 1)}
    style={{
      padding: "6px 12px",
      border: "1px solid #ddd",
      background: "white",
      cursor: "pointer"
    }}
  >
    +
  </button>

</div>
          
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
