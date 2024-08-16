import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const ProductCard = ({ name, price, imageUrl, location, time, id }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="border rounded-lg shadow-md group overflow-hidden"
    >
      <img
        className="rounded-t-lg group-hover:scale-105 transition-animate"
        src={imageUrl}
        alt={name}
      />
      <p className="p-4">
        <p className="text-xl font-semibold">₹{price}</p>
        <p className="text-gray-800 text-lg line-clamp-1">{name}</p>
        <div className="flex w-full justify-between items-center mt-1">
          <p className="text-sm text-gray-600 flex justify-center items-center">
            <IoLocationOutline className="mr-1 group-hover:text-violet-700 transition-animate" />
            {location}
          </p>
          <p className="text-sm text-gray-600">{time}</p>
        </div>
      </p>
    </Link>
  );
};

export default ProductCard;
