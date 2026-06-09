export const dynamic = "force-dynamic";
import { shopifyFetch } from "../lib/shopify";

async function getProducts() {
  const query = `
  query {
    products(first: 6) {
      edges {
        node {
          id
          title
          
          priceRange {
          minVariantPrice {
            amount
          }
         }

          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;

  const res = await shopifyFetch(query);
  return res.data?.products?.edges || [];
}

export default async function Home() {
  const productsData = await getProducts();
const products = Array.isArray(productsData) ? productsData : [];
console.log("SHOPIFY PRODUCTS:", products); 

  return (
    <main style={{
      fontFamily: "Arial",
      padding: "40px",
      background: "#f5f5f5",
      minHeight: "100vh"
    }}>
      
      {/* Hero Section */}
      <section style={{
        background: "white",
        padding: "60px",
        borderRadius: "20px",
        marginBottom: "30px"
      }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Urbexo
        </h1>

        <p style={{ fontSize: "20px", color: "#555" }}>
          AI-powered Infrastructure for Local Commerce Ecosystems
        </p>
      </section>

      {/* Featured Vendors */}
      <section style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        marginBottom: "30px"
      }}>
        <h2>Featured Vendors</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>
         <div style={{ background: "#fafafa", padding: "20px", borderRadius: "12px" }}>
  Mermaid Aquariums
</div>

<div style={{ background: "#fafafa", padding: "20px", borderRadius: "12px" }}>
  SP Center
</div>

<div style={{ background: "#fafafa", padding: "20px", borderRadius: "12px" }}>
  Local Marketplace
</div>
        </div>
      </section>

      {/* Featured Products (NOW DYNAMIC) */}
      <section style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        marginBottom: "30px"
      }}>
        <h2>Featured Products</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>
          {products.map((p) => (
            <div
              key={p.node.id}
              style={{
                background: "#fafafa",
                padding: "20px",
                borderRadius: "12px"
              }}
            >
             <div>
{p.node.images?.edges?.[0]?.node?.url && (
  <img
    src={p.node.images.edges[0].node.url}
    alt={p.node.title}
    style={{
      width: "100%",
      height: "160px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "10px"
    }}
  />
)}

  <div>{p.node.title}</div>
    <div
  style={{
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "6px"
  }}
>
  ${Number(
    p.node.priceRange?.minVariantPrice?.amount || 0
  ).toFixed(2)}
</div>
</div>
            </div>
          ))}
        </div>
      </section>

      {/* City Feed */}
      <section style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px"
      }}>
        <h2>City Commerce Feed</h2>

        <p style={{
          marginTop: "20px",
          color: "#666"
        }}>
          Connecting merchants, communities, logistics, and partners into one AI-powered ecosystem.
        </p>
      </section>

    </main>
  );
}
