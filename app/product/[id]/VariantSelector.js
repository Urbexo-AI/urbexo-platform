"use client";

export default function VariantSelector({ variants = [] }) {
  const list = variants
    .map((v) => v.node)
    .filter((v) => v.title !== "Default Title");

  if (!list || list.length <= 1) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Options</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {list.map((v) => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  );
}
