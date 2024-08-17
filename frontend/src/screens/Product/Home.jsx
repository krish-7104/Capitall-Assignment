import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseLink } from "../../../utils/BaseApi";
import ProductCard from "../../components/ProductCard";
import { FaSearch } from "react-icons/fa"; // Import search icon

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const GetAllProducts = async () => {
      try {
        const response = await axios.get(
          `${BaseLink}/product/all-products?search=${debouncedSearchQuery}`
        );
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        //
      }
    };
    GetAllProducts();
  }, [debouncedSearchQuery]);

  return (
    <main className="flex flex-col justify-center items-center max-w-6xl mx-auto mt-28">
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {products.length > 0 ? (
        <section className="grid grid-cols-3 gap-6 w-full mt-5">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              imageUrl={item.image}
              title={item.title}
              price={item.price}
              location={item.location}
              time={item.updatedAt}
              id={item._id}
            />
          ))}
        </section>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No products available
        </div>
      )}
    </main>
  );
};

export default Home;
