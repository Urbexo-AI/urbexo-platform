export async function shopifyFetch(query, variables = {}) {
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2026-04/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  return data;
}
