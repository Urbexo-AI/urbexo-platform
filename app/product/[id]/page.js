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
            selectedOptions {
              name
              value
            }
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
    id: `gid://shopify/Product/${id}`,
  });

  return res.data?.product;
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

        {/* Left Image Gallery */}
        <div>
          <ImageGallery images={product.images} />
        </div>

        {/* Right Product Info */}
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
