import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseLink } from "../../../utils/BaseApi";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const GetAllProducts = async (e) => {
    try {
      const response = await axios.get(`${BaseLink}/product/all-products`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    GetAllProducts();
  }, []);
  return (
    <main className="flex justify-center items-center max-w-6xl mx-auto mt-28">
      <section className="grid grid-cols-3 gap-6">
        {products &&
          products.map((item) => {
            return (
              <>
                <ProductCard
                  key={item._id}
                  imageUrl={item.image}
                  name={item.name}
                  price={item.price}
                  location={item.location}
                  time={item.updatedAt}
                  id={item._id}
                />
              </>
            );
          })}
      </section>
    </main>
  );
};

export default Home;
