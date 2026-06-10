import { shopifyFetch } from "../../../lib/shopify";
import ImageGallery from "./ImageGallery";
import VariantSelector from "./VariantSelector";
import ProductInfo from "./ProductInfo";

async function getProduct(id) {

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
  `;

  const res = await shopifyFetch(query, {
  id: params.id,
});

  return res.data?.product;
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const variants = product.variants?.edges || [];
  const realVariants = variants
    .map((v) => v.node)
    .filter((v) => v.title !== "Default Title");

  const hasVariants = realVariants.length > 1;

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}
      >
        {/* Left - Images */}
        <div>
          <ImageGallery images={product.images} />
        </div>

        {/* Right - Info */}
        <ProductInfo product={product} />

  </div>
</main>
  );
}
