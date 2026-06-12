import { shopifyFetch } from "../../../../lib/shopify";

export async function POST(req) {
  try {
    const { cartId } = await req.json();

    const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    title
                    price {
                      amount
                    }
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await shopifyFetch(query, { cartId });

    return Response.json({
      cart: res?.data?.cart || null,
    });
  } catch (err) {
    return Response.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
