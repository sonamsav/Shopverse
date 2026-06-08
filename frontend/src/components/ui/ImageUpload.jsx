import React from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ImageUpload = ({ productData, setProductData }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const totalImages = [
      ...productData.productImg,
      ...files,
    ];

    if (totalImages.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    setProductData((prev) => ({
      ...prev,
      productImg: totalImages,
    }));
  };

  const removeImage = (index) => {
    const updatedImages = productData.productImg.filter(
      (_, i) => i !== index
    );

    setProductData((prev) => ({
      ...prev,
      productImg: updatedImages,
    }));
  };

  return (
    <div>
      {/* Upload Box */}
      <label
        className="
          h-20
          border
          border-dashed
          rounded-lg
          flex
          flex-col
          items-center
          justify-center
          gap-1
          text-sm
          text-slate-500
          hover:bg-slate-50
          cursor-pointer
          transition
        "
      >
        <ImagePlus size={20} />

        <span>Upload Product Images</span>

        <span className="text-xs text-slate-400">
          Maximum 6 images
        </span>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      {/* Image Count */}
      {productData.productImg.length > 0 && (
        <p className="text-xs text-slate-500 mt-2">
          {productData.productImg.length}/6 images selected
        </p>
      )}

      {/* Preview Section */}
      {productData.productImg.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {productData.productImg.map((file, index) => (
            <div
              key={index}
              className="
                relative
                border
                rounded-lg
                overflow-hidden
                bg-white
              "
            >
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="
                  w-full
                  h-28
                  object-cover
                "
              />

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="
                  absolute
                  top-2
                  right-2
                  h-7
                  w-7
                  rounded-full
                  bg-white
                  shadow
                  flex
                  items-center
                  justify-center
                  hover:bg-red-50
                "
              >
                <Trash2
                  size={15}
                  className="text-red-500"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;