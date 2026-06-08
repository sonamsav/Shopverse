import React, { useState } from "react";

const ProductImg = ({ product }) => {
  const [activeImage, setActiveImage] = useState(
    product?.productImg?.[0]?.url
  );

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {product?.productImg?.map((img) => (
          <img
            key={img.public_id}
            src={img.url}
            alt=""
            onClick={() => setActiveImage(img.url)}
            className="w-20 h-20 object-cover border rounded cursor-pointer hover:border-pink-500"
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 border rounded-lg p-4 bg-white">
        <img
          src={activeImage}
          alt={product?.productName}
          className="w-full h-[500px] object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImg;