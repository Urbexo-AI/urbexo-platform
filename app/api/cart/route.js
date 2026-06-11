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

    const cartCreateMutation = `
      mutation cartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl

            lines(first: 50) {
              edges {
                node {
                  quantity

                  merchandise {
                    ... on ProductVariant {
                      id
                      title

                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }

          userErrors {
            message
          }
        }
      }
    `;

    const cartLinesAddMutation = `
      mutation cartLinesAdd(
        $cartId: ID!,
        $lines: [CartLineInput!]!
      ) {
        cartLinesAdd(
          cartId: $cartId,
          lines: $lines
        ) {
          cart {
            id
            checkoutUrl

            lines(first: 50) {
              edges {
                node {
                  quantity

                  merchandise {
                    ... on ProductVariant {
                      id
                      title

                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }

          userErrors {
            message
          }
        }
      }
    `;

    let res;

    if (cartId) {
      res = await shopifyFetch(
        cartLinesAddMutation,
        {
          cartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity: quantity || 1,
            },
          ],
        }
      );
    } else {
      res = await shopifyFetch(
        cartCreateMutation,
        {
          lines: [
            {
              merchandiseId: variantId,
              quantity: quantity || 1,
            },
          ],
        }
      );
    }

    const cart =
      res?.data?.cartCreate?.cart ||
      res?.data?.cartLinesAdd?.cart;

    if (!cart) {
      console.error(
        "Shopify Response:",
        JSON.stringify(res, null, 2)
      );

      return Response.json(
        { error: "Cart not returned" },
        { status: 500 }
      );
    }

    return Response.json({
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      cart,
    });

  } catch (err) {
    console.error(
      "Cart API Error:",
      err
    );

    return Response.json(
      {
        error: "Server error",
        detail: String(err),
      },
      {
        status: 500,
      }
    );
  }
}
