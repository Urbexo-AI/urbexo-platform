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

    try {
      const savedCartId = localStorage.getItem("cartId");

      if (!selectedVariant?.id) {
        setLoading(false);
        return;
      }

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId: selectedVariant.id,
          quantity,
          cartId: savedCartId,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (data?.cartId) {
        localStorage.setItem("cartId", data.cartId);
      }

      setCartData(data.cart);
      setCartOpen(true);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <div>
      <h1>{product.title}</h1>

      <p style={{ color: "#666" }}>
        Vendor: {product.vendor}
      </p>

      <p style={{ fontSize: "22px", fontWeight: "bold" }}>
        $
        {Number(selectedVariant?.price?.amount || 0).toFixed(2)}
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
          borderRadius: "8px",
          cursor: "pointer",
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

      {/* ================= CART DRAWER ================= */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "360px",
            height: "100vh",
            background: "white",
            boxShadow: "-2px 0 10px rgba(0,0,0,0.15)",
            padding: "20px",
            zIndex: 9999,
            overflowY: "auto",
          }}
        >
          <h2>Cart</h2>

          {!cartData?.lines?.edges?.length && (
            <p>No items in cart</p>
          )}

          {cartData?.lines?.edges?.map(({ node }, i) => (
            <div
              key={i}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {node.merchandise.product.title}
              </div>

              <div style={{ fontSize: "12px", color: "#666" }}>
                Qty: {node.quantity}
              </div>
            </div>
          ))}

          <button
            onClick={() => setCartOpen(false)}
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "black",
              color: "white",
              border: "none",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
