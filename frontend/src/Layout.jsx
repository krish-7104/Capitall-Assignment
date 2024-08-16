import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./shared/Navbar";
import { UserContext } from "./context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { BaseLink } from "../utils/BaseApi";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const GetUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }
        const resp = await axios.post(
          `${BaseLink}/auth/get-user`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(resp.data.data);
      } catch (error) {
        //
      }
    };

    if (
      !location.pathname?.includes("/login") &&
      !location.pathname?.includes("/register") &&
      !location.pathname?.includes("/forget-password") &&
      !location.pathname?.includes("/verify-token")
    ) {
      GetUser();
    }
  }, [location, navigate, setUser]);

  return (
    <section className="w-full">
      <Navbar />
      <Outlet />
      <Toaster position="bottom-right" />
    </section>
  );
};

export default Layout;
