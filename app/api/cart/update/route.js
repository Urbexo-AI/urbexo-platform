import { shopifyFetch } from "../../../../lib/shopify";

export async function POST(req) {
  try {
    const { cartId, lineId, quantity } = await req.json();

    const mutation = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
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
      }
    `;

    const res = await shopifyFetch(mutation, {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    });

    return Response.json({
      cart: res?.data?.cartLinesUpdate?.cart,
    });

  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
