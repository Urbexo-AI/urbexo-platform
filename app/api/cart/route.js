import { shopifyFetch } from "@/lib/shopify";

export async function POST(req) {
  const { variantId } = await req.json();

  const mutation = `
    mutation cartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          checkoutUrl
        }
      }
    }
  `;

  const res = await shopifyFetch(mutation, {
    lines: [
      {
        merchandiseId: variantId,
        quantity: 1,
      },
    ],
  });

  return Response.json({
    checkoutUrl: res.data.cartCreate.cart.checkoutUrl,
  });
}
