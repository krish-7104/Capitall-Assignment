import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseLink } from "../../../utils/BaseApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...");
    try {
      const response = await axios.post(`${BaseLink}/auth/forget-password`, {
        email,
      });
      toast.dismiss();
      if (response.data.success) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <section className="flex flex-col mx-auto justify-center items-center h-[100vh] w-full bg-white">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a password reset link.
          </p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-700 px-5 py-3 text-sm font-medium text-white"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
