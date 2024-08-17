import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { BaseLink } from "../../../utils/BaseApi";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    toast.loading("Processing...");
    try {
      const response = await axios.post(`${BaseLink}/auth/verify-token`, {
        token: id,
        password,
      });
      toast.dismiss();
      if (response.data.success) {
        toast.success("Password updated successfully.");
        navigate("/login");
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
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Update Password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="password" className="sr-only">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter new password"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-700 px-5 py-3 text-sm font-medium text-white"
          >
            Update Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdatePassword;
