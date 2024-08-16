import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { BaseLink } from "../../../utils/BaseApi";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.replace("/product/", "");
  const [product, setProduct] = useState();
  const GetProduct = async (e) => {
    try {
      const response = await axios.get(
        `${BaseLink}/product/get-product/${productId}`
      );
      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    GetProduct();
  }, []);
  return (
    <main className="flex justify-evenly items-start pt-24 h-[100vh] w-full overflow-hidden max-w-7xl mx-auto">
      {product && (
        <>
          <section className="w-[55%] h-full">
            <img src={product.image} alt="" className="rounded-md shadow-md" />
            <div className="inline-block border-2 px-3 py-1 rounded-full border-violet-700 mt-4">
              <p className="text-gray-900 flex justify-start items-center">
                <IoLocationOutline className="mr-1 text-violet-700 transition-animate" />
                {product.location}
              </p>
            </div>
          </section>
          <section className="w-[40%] h-full max-h-[80vh] overflow-y-auto">
            <div className="w-full border rounded-md shadow-md p-5">
              <p className="font-bold text-2xl text-gray-900">
                ₹{product.price}
              </p>
              <p className="text-xl font-semibold mt-1 text-gray-800">
                {product.name}
              </p>
              <p className="text-gray-700 text-sm text-pretty leading-6 mt-1">
                {product.description}
              </p>
            </div>
            <div className="w-full border rounded-md shadow-md p-5 mt-4">
              <p className="text-sm font-medium mt-1 text-gray-600">
                Seller Information
              </p>
              <div className="flex justify-between items-center w-full">
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {product.seller.name}
                </p>
                <button className="mt-2 bg-violet-700 text-white px-4 py-1 rounded-full">
                  Contact Seller
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Product;
