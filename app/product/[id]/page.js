import { shopifyFetch } from "../../../lib/shopify";
import ImageGallery from "./ImageGallery";

async function getProduct(id) {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        vendor
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 10) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch(query, {
    id: `gid://shopify/Product/${id}`,
  });

  return res.data?.product;
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const imageUrl = product.images?.edges?.[0]?.node?.url;

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

        {/* 左边图片 */}
        <div>
          {imageUrl && (
            <img
              src={imageUrl}
              style={{
                width: "100%",
                borderRadius: "12px"
              }}
            />
          )}
        </div>

        {/* 右边信息 */}
        <div>
          <h1>{product.title}</h1>

          <p style={{ color: "#666" }}>
            Vendor: {product.vendor}
          </p>

          <p style={{ fontSize: "22px", marginTop: "10px" }}>
            ${Number(product.priceRange?.minVariantPrice?.amount || 0).toFixed(2)}
          </p>

        </div>

      </div>

    </main>
  );
}
