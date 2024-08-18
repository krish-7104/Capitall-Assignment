import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BaseLink } from "../../../utils/BaseApi";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const Product = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const productId = location.pathname.replace("/product/", "");
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetProduct = async () => {
      try {
        const response = await axios.get(
          `${BaseLink}/product/get-product/${productId}`
        );
        if (response.data.success) {
          setProduct(response.data.data);
        }
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    };
    GetProduct();
  }, [productId]);

  const buyProductHandler = async () => {
    toast.loading("Processing...");
    try {
      const response = await axios.post(
        `${BaseLink}/product/buy-product/${productId}`,
        {
          userId: user._id,
        }
      );
      if (response.data.success) {
        toast.dismiss();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error in Purchasing Product!");
    }
  };

  return (
    <main className="flex justify-evenly items-start pt-24 pb-10 w-full max-w-7xl mx-auto">
      {loading ? (
        <Loader />
      ) : (
        product && (
          <>
            <section className="w-[55%] h-full sticky top-10 p-4">
              <img
                src={product.image}
                alt=""
                className="rounded-md shadow max-h-[80vh] w-full object-cover"
              />
              <div className="w-full border rounded-md shadow p-3 mt-4">
                <p className="text-xl text-gray-900 font-semibold">
                  Description
                </p>
                <p className="text-gray-900 text-pretty leading-6 mt-1">
                  {product.description}
                </p>
              </div>
            </section>
            <section className="w-[40%] h-full">
              <div className="w-full border rounded-md shadow p-5">
                <p className="font-semibold text-xl text-gray-900">
                  {product.title}
                </p>
                <p className="text-2xl font-medium mt-1 text-gray-800">
                  Price : ₹{product.price}
                </p>
              </div>
              <div className="w-full border rounded-md shadow p-5 mt-4">
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="font-semibold text-xl text-gray-900">
                  {product.location.city}, {product.location.state}
                </p>
                <p className="mt-1 text-gray-800">
                  Pincode: {product.location.postalCode}
                </p>
              </div>
              <div className="w-full border rounded-md shadow p-5 mt-4">
                <p className="text-sm font-medium text-gray-600">
                  Seller Information
                </p>
                <div className="flex justify-between items-center w-full">
                  <p className="text-xl font-semibold text-gray-800">
                    {product.seller._id === user?._id
                      ? "You"
                      : product.seller.name}
                  </p>
                  {product.seller._id !== user?._id && (
                    <button
                      className="mt-2 bg-violet-700 text-white px-4 py-1 rounded-full"
                      onClick={() => {
                        navigator.clipboard.writeText(product.seller.email);
                        toast.dismiss();
                        toast.success("Email Copied!");
                      }}
                    >
                      Contact Seller
                    </button>
                  )}
                </div>
              </div>
              {product.seller._id !== user?._id && (
                <button
                  className="mt-4 w-[90%] mx-auto bg-violet-700 block text-white p-3 rounded-full shadow-md shadow-violet-400"
                  onClick={buyProductHandler}
                >
                  Buy This Product
                </button>
              )}
            </section>
          </>
        )
      )}
    </main>
  );
};

export default Product;
