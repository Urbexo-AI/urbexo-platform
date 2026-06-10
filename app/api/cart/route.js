import { shopifyFetch } from '@/lib/shopify';

export async function POST(req) {
  try {
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
      console.error("Shopify Response:", res);

      return Response.json(
        { error: "No checkoutUrl returned from Shopify" },
        { status: 500 }
      );
    }

    return Response.json({ checkoutUrl });
  } catch (err) {
    console.error("Cart API Error:", err);

    return Response.json(
      { error: "Server error", detail: String(err) },
      { status: 500 }
    );
  }
}
