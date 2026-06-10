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
  const [cartOpen, setCartOpen] = useState(false);
const [cartData, setCartData] = useState(null);
const [loading, setLoading] = useState(false);

 async function handleAddToCart() {
   setLoading(true);
   const savedCartId = localStorage.getItem("cartId");
   
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
      cartId: savedCartId,
    }),
  });

  const data = await res.json();
   setLoading(false);

  console.log("API RESPONSE:", data);

   if (data?.cartId) {
  localStorage.setItem("cartId", data.cartId);
}
   setCartData(data);
setCartOpen(true);

  if (data?.checkoutUrl) {
    
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

    <p style={{ fontSize: "22px", fontWeight: "bold" }}>
      ${Number(selectedVariant?.price?.amount || 0).toFixed(2)}
    </p>

    <VariantSelector
      variants={variants}
      onSelect={(v) => setSelectedVariant(v)}
    />

    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
        -
      </button>

      <span>{quantity}</span>

      <button onClick={() => setQuantity(q => q + 1)}>
        +
      </button>
    </div>

    <button
      onClick={handleAddToCart}
      disabled={loading}
      style={{
        marginTop: "15px",
        padding: "12px 20px",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "8px",
      }}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>

    <div
      style={{ marginTop: "20px", color: "#444" }}
      dangerouslySetInnerHTML={{
        __html: product.descriptionHtml || "",
      }}
    />

    {/* 🚨 Drawer 必须在 return 内部最后 */}
    {cartOpen && (
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "360px",
          height: "100vh",
          background: "white",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
          padding: "20px",
          zIndex: 9999,
        }}
      >
        <h2>Cart</h2>

        <p style={{ fontSize: "12px", color: "#666" }}>
          Cart ID:
        </p>

        <p style={{ fontSize: "12px" }}>
          {cartData?.cartId}
        </p>

        <button
          onClick={() => setCartOpen(false)}
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Close
        </button>
      </div>
    )}
  </div>
);
