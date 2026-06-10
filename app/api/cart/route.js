import { shopifyFetch } from "../../../lib/shopify";

export async function POST(req) {
  try {
    const { variantId, quantity, cartId } = await req.json();

    if (!variantId) {
      return Response.json(
        { error: "Missing variantId" },
        { status: 400 }
      );
    }

    // 1️⃣ 创建购物车
    const cartCreateMutation = `
      mutation cartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            message
          }
        }
      }
    `;

    // 2️⃣ 追加购物车
    const cartLinesAddMutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            message
          }
        }
      }
    `;

    // 3️⃣ 执行逻辑（核心）
    let res;

    if (cartId) {
      res = await shopifyFetch(cartLinesAddMutation, {
        cartId,
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity || 1,
          },
        ],
      });
    } else {
      res = await shopifyFetch(cartCreateMutation, {
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity || 1,
          },
        ],
      });
    }

    // 4️⃣ 统一取值
    const cart =
  res?.data?.cartCreate?.cart ||
  res?.data?.cartLinesAdd?.cart;

const checkoutUrl = cart?.checkoutUrl;
const newCartId = cart?.id;

    if (!checkoutUrl) {
      console.error("Shopify Response:", JSON.stringify(res, null, 2));

      return Response.json(
        { error: "No checkoutUrl returned" },
        { status: 500 }
      );
    }

    // 5️⃣ 返回
   return Response.json({
  checkoutUrl: cart?.checkoutUrl,
  cartId: cart?.id,
  cart,
});

  } catch (err) {
    console.error("Cart API Error:", err);

    return Response.json(
      { error: "Server error", detail: String(err) },
      { status: 500 }
    );
  }
}
