import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./shared/Navbar";

const Layout = () => {
  return (
    <section className="w-full">
      <Navbar />
      <Outlet />
      <Toaster position="bottom-right" />
    </section>
  );
};

export default Layout;
