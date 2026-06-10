import { shopifyFetch } from "../../../lib/shopify";

export async function POST(req) {
  try {
   const {
  variantId,
  quantity,
  cartId,
} = await req.json();
    
    if (!variantId) {
      return Response.json(
        { error: "Missing variantId" },
        { status: 400 }
      );
    }

let res;

if (cartId) {
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
  res = await shopifyFetch(mutation, {
    lines: [
      {
        merchandiseId: variantId,
        quantity: quantity || 1,
      },
    ],
  });
}
    
    const mutation = `
      mutation cartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
  checkoutUrl
  id
}
          userErrors {
            message
          }
        }
      }
    `;

    const res = await shopifyFetch(mutation, {
      lines: [
        {
          merchandiseId: variantId,
          quantity: quantity || 1,
        },
      ],
    });

    const checkoutUrl =
  res?.data?.cartCreate?.cart?.checkoutUrl ||
  res?.data?.cartLinesAdd?.cart?.checkoutUrl;

const cartId =
  res?.data?.cartCreate?.cart?.id ||
  res?.data?.cartLinesAdd?.cart?.id;

    if (!checkoutUrl) {
      console.error("Shopify Response:", JSON.stringify(res, null, 2));

      return Response.json(
        { error: "No checkoutUrl returned" },
        { status: 500 }
      );
    }

    return Response.json({
  checkoutUrl,
  cartId,
});
  } catch (err) {
    console.error("Cart API Error:", err);

    return Response.json(
      { error: "Server error", detail: String(err) },
      { status: 500 }
    );
  }
}
