export async function shopifyFetch(query, variables = {}) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;

  console.log("SHOPIFY DOMAIN:", domain);

  if (!domain) {
    throw new Error("SHOPIFY_STORE_DOMAIN is not defined in environment variables");
  }

  const endpoint = `https://${domain}/api/2026-04/graphql.json`;

  console.log("SHOPIFY ENDPOINT:", endpoint);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  console.log("SHOPIFY RAW RESPONSE:", data);

  return data;
}
