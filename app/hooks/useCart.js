"use client";

import { useState, useCallback } from "react";

export default function useCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const cartId =
    typeof window !== "undefined"
      ? localStorage.getItem("cartId")
      : null;

  // 统一拉取 cart（核心）
  const refreshCart = useCallback(async () => {
    if (!cartId) return null;

    setLoading(true);

    try {
      const res = await fetch("/api/cart/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId }),
      });

      const data = await res.json();

      setCart(data.cart);
      return data.cart;
    } catch (err) {
      console.error("refreshCart error:", err);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  // Add / Update / Remove 后统一调用
  const mutateCart = async (actionFn) => {
    await actionFn();
    await refreshCart();
  };

  return {
    cart,
    setCart,
    loading,
    refreshCart,
    mutateCart,
  };
}
