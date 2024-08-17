import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  useEffect(() => {}, []);
  return (
    <nav className="w-full bg-gray-100 shadow border-b select-none fixed top-0 z-40">
      <section className="max-w-7xl py-3 px-6 flex justify-between items-center mx-auto">
        <Link to={"/"} className="flex justify-center items-center">
          <AiOutlineProduct className="text-violet-700 text-3xl" />{" "}
          <p className="font-bold text-violet-700 text-2xl ml-1">OLX</p>
        </Link>
        <div className="flex justify-end items-center">
          {user && !user.email && location.pathname !== "/login" && (
            <Link
              to={"/login"}
              className="text-violet-700 px-4 py-2 rounded-full flex justify-center items-center mr-3 font-medium text-lg"
            >
              Login
            </Link>
          )}
          {location.pathname !== "/sell-product" && (
            <Link
              to={"/sell-product"}
              className="from-violet-700 to-violet-600 shadow-md shadow-violet-500/50 bg-gradient-to-tr text-white px-4 py-2 rounded-full flex justify-center items-center mr-3"
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
          )}
          {user && user?.email && location.pathname !== "/myaccount" && (
            <Link
              to={"/myaccount"}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-violet-700 to-violet-600 text-white shadow-md shadow-violet-500/50"
            >
              <span className="text-lg">
                {user?.name?.split(" ")?.[0]?.[0]}
                {user?.name?.split(" ")?.[1]?.[0]}
              </span>
            </Link>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
