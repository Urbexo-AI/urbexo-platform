"use client";

import { useState } from "react";

export default function VariantSelector({ variants, onSelect }) {
  const list = variants
    .map((v) => v.node)
    .filter((v) => v.title !== "Default Title");

  const [active, setActive] = useState(null);

  if (list.length <= 1) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Options</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {list.map((v) => (
          <button
            key={v.id}
            onClick={() => {
              setActive(v.id);
              onSelect?.(v);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border:
                active === v.id
                  ? "2px solid black"
                  : "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            {v.title}
          </button>
        ))}
      </div>
    </div>
  );
}
