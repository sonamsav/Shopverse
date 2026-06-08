import BreadCrumbs from "@/components/ui/BreadCrumbs";
import ProductDesc from "@/components/ui/ProductDesc";
import ProductImg from "@/components/ui/ProductImg";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProducts = () => {
  const { id } = useParams();

  const { products } = useSelector((store) => store.product);

  const product = products.find((item) => item._id === id);

  if (!product) {
    return (
      <div className="pt-20 flex justify-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="pt-5 pb-10 max-w-7xl mx-auto px-4">
      <BreadCrumbs product={product} />

     <div className="mt-6 grid lg:grid-cols-[45%_55%] gap-8 items-start">
  <ProductImg product={product} />
  <ProductDesc product={product} />
</div>
    </div>
  );
};

export default SingleProducts;