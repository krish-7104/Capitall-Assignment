import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-100 shadow border-b select-none">
      <section className="max-w-7xl py-3 px-6 flex justify-between items-center mx-auto">
        <Link to={"/"} className="flex justify-center items-center">
          <AiOutlineProduct className="text-violet-800 text-3xl" />{" "}
          <p className="font-bold text-violet-800 text-2xl ml-1">OLX</p>
        </Link>
        <div className="w-[35%] flex justify-center items-center">
          <input
            type="text"
            placeholder="Search a product..."
            className="outline-none border-2 rounded-full py-2 px-4 border-violet-800 focus:border-violet-600 w-full"
          />
          <button>
            <IoSearch className="ml-2 text-3xl text-violet-800 hover:text-violet-600" />
          </button>
        </div>
        <div className="flex justify-end items-center">
          <Link
            to={"/login"}
            className="text-violet-800 px-4 py-2 rounded-full flex justify-center items-center mr-3 font-medium text-lg"
          >
            Login
          </Link>
          <Link
            to={"/sell-product"}
            className="from-violet-800 to-violet-600 shadow-md shadow-violet-500/50 bg-gradient-to-tr text-white px-4 py-2 rounded-full flex justify-center items-center"
          >
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 1024 1024"
              data-aut-id="icon"
              className="mr-2"
              fill="white"
            >
              <path d="M414.898 123.739v291.218h-291.218l-97.014 97.014 97.014 97.131h291.218v291.16l97.073 97.071 97.073-97.071v-291.16h291.16l97.131-97.131-97.131-97.014h-291.16v-291.218l-97.073-97.073z"></path>
            </svg>
            <p className="font-medium">Sell Product</p>
          </Link>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
