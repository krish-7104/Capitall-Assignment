import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseLink } from "../../../utils/BaseApi";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...");
    try {
      const response = await axios.post(`${BaseLink}/auth/login`, data);
      if (response.data.success) {
        const { token } = response.data.data;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        toast.dismiss();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <section className="flex flex-col mx-auto justify-center items-center h-[100vh] w-full bg-white">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Welcome Back, Login Now!
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link className="underline ml-2" to={"/register"}>
                Register
              </Link>
            </p>
            <button
              type="submit"
              className="inline-block rounded-lg bg-violet-700 px-5 py-3 text-sm font-medium text-white"
            >
              Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/forget-password"
              className="text-sm text-violet-700 underline"
            >
              Forget Password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
