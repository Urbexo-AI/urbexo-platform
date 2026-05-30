export async function shopifyFetch(query, variables = {}) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;

  console.log("DOMAIN:", domain);

  if (!domain) {
    console.error("❌ SHOPIFY_STORE_DOMAIN MISSING");
    return { data: null, error: "missing domain" };
  }

  const endpoint = `https://${domain}/api/2026-04/graphql.json`;

  console.log("ENDPOINT:", endpoint);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    console.log("SHOPIFY RESPONSE:", data);

    return data;
  } catch (err) {
    console.error("❌ FETCH FAILED:", err);
    return { data: null, error: err.message };
  }
}
