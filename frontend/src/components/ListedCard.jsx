import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { dataFormatter } from "../../utils/DateFormatter";

const ListedCard = ({ name, price, imageUrl, time, id }) => {
  return (
    <div className="relative border rounded-md shadow group overflow-hidden">
      <Link to={`/product/${id}`}>
        <img
          className="rounded-t-md group-hover:scale-105 transition-animate h-[200px] object-cover w-full"
          src={imageUrl}
          alt={name}
        />
      </Link>

      <Link
        to={`/update-product/${id}`}
        className="absolute top-2 right-2 text-white bg-violet-600 p-3 rounded-full shadow-lg hover:bg-violet-700 transition"
      >
        <FiEdit className="w-5 h-5" />
      </Link>

      <div className="p-4">
        <Link to={`/product/${id}`}>
          <p className="text-xl font-semibold">₹{price}</p>
          <p className="text-gray-800 text-lg line-clamp-1">{name}</p>
          <p className="text-sm text-gray-600 mt-1">
            Listed {dataFormatter(time)}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ListedCard;
