import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { dataFormatter } from "../../utils/DateFormatter";
const ProductCard = ({ title, price, imageUrl, location, time, id }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="border rounded-md shadow group overflow-hidden"
    >
      <img
        className="rounded-t-md group-hover:scale-105 transition-animate h-[200px] object-cover w-full"
        src={imageUrl}
        alt={title}
      />
      <p className="p-4">
        <p className="text-xl font-semibold">₹{price}</p>
        <p className="text-gray-800 text-lg line-clamp-1">{title}</p>
        <p className="text-sm text-gray-600 flex justify-start mt-1 items-center">
          <IoLocationOutline className="mr-1 group-hover:text-violet-700 transition-animate" />
          {location.city}, {location.state}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Posted {dataFormatter(time)}
        </p>
      </p>
    </Link>
  );
};

export default ProductCard;
