"use client";

import { useState } from "react";

export default function ImageGallery({ images }) {
  const [active, setActive] = useState(0);

  const imageList = images?.edges?.map(e => e.node.url) || [];

  if (imageList.length === 0) return null;

  return (
    <div>
      {/* 主图 */}
      <img
        src={imageList[active]}
        style={{
          width: "100%",
          borderRadius: "12px",
          marginBottom: "10px"
        }}
      />

      {/* 缩略图 */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {imageList.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setActive(index)}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px",
              cursor: "pointer",
              border: active === index ? "2px solid black" : "1px solid #ddd"
            }}
          />
        ))}
      </div>
    </div>
  );
}
