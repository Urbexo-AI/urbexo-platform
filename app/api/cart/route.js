import { shopifyFetch } from "@/lib/shopify";

export async function POST(req) {
  const { variantId } = await req.json();

  if (!variantId) {
    return Response.json(
      { error: "Missing variantId" },
      { status: 400 }
    );
  }

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

  const checkoutUrl =
    res?.data?.cartCreate?.cart?.checkoutUrl;

  if (!checkoutUrl) {
    return Response.json(
      { error: "No checkoutUrl returned" },
      { status: 500 }
    );
  }

  return Response.json({ checkoutUrl });
}
