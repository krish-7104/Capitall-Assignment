import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { dataFormatter } from "../../utils/DateFormatter";
const ListedCard = ({ name, price, imageUrl, time, id }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="border rounded-md shadow group overflow-hidden"
    >
      <img
        className="rounded-t-md group-hover:scale-105 transition-animate h-[200px] object-cover w-full"
        src={imageUrl}
        alt={name}
      />
      <p className="p-4">
        <p className="text-xl font-semibold">₹{price}</p>
        <p className="text-gray-800 text-lg line-clamp-1">{name}</p>
        <p className="text-sm text-gray-600 mt-1">
          Listed {dataFormatter(time)}
        </p>
      </p>
    </Link>
  );
};

export default ListedCard;
