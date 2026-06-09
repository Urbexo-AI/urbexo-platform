import { shopifyFetch } from "../../../lib/shopify";
import ImageGallery from "./ImageGallery";
import VariantSelector from "./VariantSelector";

async function getProduct(id) {
  const cleanId = id.replace("gid://shopify/Product/", "");

  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        vendor
        descriptionHtml

        priceRange {
          minVariantPrice {
            amount
          }
        }

        images(first: 20) {
          edges {
            node {
              url
            }
          }
        }

        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch(query, {
    id: `gid://shopify/Product/${cleanId}`,
  });

  return res.data?.product;
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const variants = product.variants?.edges || [];
  const hasMultipleVariants =
    variants.filter((v) => v.node.title !== "Default Title").length > 1;

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}
      >
        {/* Left - Image Gallery */}
        <div>
          <ImageGallery images={product.images} />
        </div>

        {/* Right - Product Info */}
        <div>
          {/* Title */}
          <h1>{product.title}</h1>

          {/* Vendor */}
          <p style={{ color: "#666" }}>
            Vendor: {product.vendor}
          </p>

          {/* Price */}
          <p
            style={{
              fontSize: "22px",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            $
            {Number(
              product.priceRange?.minVariantPrice?.amount || 0
            ).toFixed(2)}
          </p>

          <VariantSelector
  variants={product.variants?.edges || []}
  onSelect={(v) => console.log("Selected Variant:", v)}
/>

          {/* Variants (ONLY if more than 1 real variant) */}
          {hasMultipleVariants && (
            <div style={{ marginTop: "20px" }}>
              <h3>Options</h3>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {variants
                  .map((v) => v.node)
                  .filter((v) => v.title !== "Default Title")
                  .map((v) => (
                    <button
                      key={v.id}
                      style={{
                        padding: "8px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      {v.title}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div
            style={{
              marginTop: "20px",
              color: "#444",
              lineHeight: "1.6",
            }}
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml || "",
            }}
          />
        </div>
      </div>
    </main>
  );
}
