import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";
import { useForm } from "react-hook-form";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DeleteAccount = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogout = async () => {
    const request = fetch(`${API_BASE_URL}/log-out`, {
        method:"DELETE",
        headers:{"Content-Type": "application/json"},
        
    })
    logout();
    // reset();
    navigate("/get-started");
  };

  return (
    <React.Fragment>
      <div className="max-w-xl mx-auto p-8 mt-8 mb-8 bg-white rounded-xl shadow-sm">
        <h2 className="text-4xl font-bold text-center mb-8 text-purple-700">
          Delete Account
        </h2>

        <form onSubmit={handleSubmit(handleLogout)} className="space-y-3">
          <div className="grid gap-6 mx-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium px-1">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="rounded-md px-4 py-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                {...register("email", { required: "Email is required" })}
                // className={ }
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium px-1">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                {...register("password", {
                  required: "Password required!",
                  minLength: {
                    value: 6,
                    message: "Password must contain at least 6 chars!"
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button type="submit" className="bg-red-400 mt-3 w-full rounded-sm py-3 cursor-pointer">
              Delete Acc
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default DeleteAccount;
