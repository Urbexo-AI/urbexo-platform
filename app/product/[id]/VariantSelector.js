"use client";

import { useState } from "react";

export default function VariantSelector({ variants, onChange }) {
  const list = variants?.map((v) => v.node) || [];

  const validList = list.filter(
    (v) => v.title !== "Default Title"
  );

  const defaultVariant = validList[0];

  const [selected, setSelected] = useState(defaultVariant);

  function select(v) {
    setSelected(v);
    onChange?.(v);
  }

  if (validList.length <= 1) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Options</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {validList.map((v) => (
          <button
            key={v.id}
            onClick={() => select(v)}
            style={{
              padding: "8px 12px",
              border:
                selected?.id === v.id
                  ? "2px solid black"
                  : "1px solid #ddd",
              borderRadius: "6px",
              background: "white",
              cursor: "pointer",
            }}
          >
            {v.title}
          </button>
        ))}
      </div>

      {/* Live Price */}
      <div
        style={{
          marginTop: "10px",
          fontWeight: "bold",
        }}
      >
        ${Number(selected?.price?.amount || 0).toFixed(2)}
      </div>
    </div>
  );
}
