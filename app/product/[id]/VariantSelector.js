"use client";

import { useState } from "react";

export default function VariantSelector({ variants, onChange }) {
  const list = variants?.map((v) => v.node) || [];

  const defaultVariant = list.find(
    (v) => v.title !== "Default Title"
  ) || list[0];

  const [selected, setSelected] = useState(defaultVariant);

  function handleSelect(v) {
    setSelected(v);
    onChange?.(v);
  }

  if (!list.length) return null;

  const showOptions =
    list.filter((v) => v.title !== "Default Title").length > 1;

  if (!showOptions) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Options</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {list
          .filter((v) => v.title !== "Default Title")
          .map((v) => (
            <button
              key={v.id}
              onClick={() => handleSelect(v)}
              style={{
                padding: "8px 12px",
                border: selected?.id === v.id
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

      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        ${Number(selected?.price?.amount || 0).toFixed(2)}
      </div>
    </div>
  );
}
