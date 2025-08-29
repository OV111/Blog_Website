import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GetStarted = () => {
  const navigate = useNavigate()
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = isSignedUp
      ? `${API_BASE_URL}/get-started`
      : `${API_BASE_URL}/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if(response.ok) {
        toast.success(`${result.message}`, { duration: 2250 });
        setTimeout(() => {
          navigate("/")
        },2400)
      } else if(response.status === 404) {
        toast.error(`${result.message}`)
      } else if(response.status === 401) {
        toast.error(`${result.message}`)
      }
    } catch (err) {
      console.error(err);
      toast.error("Server is unavailable. Please try again later!", {
        duration: 2500,
      });
    }
    reset();
  };

  const ToggleLink = () => {
    setIsSignedUp(!isSignedUp);
    reset();
  };

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-sm mb-8 ">
        <h2 className="text-4xl font-bold text-center mb-8 text-purple-700">
          {isSignedUp ? "Sign Up" : "Log In"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* First Name and Last Name */}
          {isSignedUp && (
            <React.Fragment>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">First Name</label>
                  <input
                    placeholder="Enter Your First Name"
                    {...register("firstName", {
                      required: "First name is required.",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <label className="block mb-1 font-medium">Last Name</label>
                  <input
                    placeholder="Enter Your Last Name"
                    {...register("lastName", {
                      required: "Last name is required.",
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          )}

          {/* Email */}
          <label className="block mb-1 font-medium">Enter Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: "Email is required." })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-medium">Enter Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 chars!",
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-5 text-gray-400 cursor-pointer"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {isSignedUp && (
            <React.Fragment>
              {/* Confirm Password */}
              <div className="relative">
                <label className="block mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password!",
                    validate: (value) => {
                      return (
                        value === getValues("password") ||
                        "Password don't match!"
                      );
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="absolute top-10 right-5 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </React.Fragment>
          )}
          <button
            type="submit"
            className="w-full mt-3  py-2 rounded-lg text-xl mx-auto text-white font-bold   bg-fuchsia-600 cursor-pointer hover:bg-fuchsia-700 transition-colors"
          >
            {isSignedUp ? "Sign Up " : "Login"}
          </button>
        </form>

        <p
          onClick={ToggleLink}
          className="text-center text-blue-500 mt-4 items-center  cursor-pointer hover:underline"
        >
          {isSignedUp
            ? "Already have an account? Login"
            : "Don't have an Account? Sign Up"}
        </p>
      </div>
    </React.Fragment>
  );
};
export default GetStarted;
