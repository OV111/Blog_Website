import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GetStarted = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
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

  const generateUsername = (firstName = "", lastName = "") => {
    const base = `${firstName}${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 16);
    const suffix = `${Date.now().toString().slice(-4)}${Math.floor(
      Math.random() * 100,
    )
      .toString()
      .padStart(2, "0")}`;

    return `${base || "dev"}_${suffix}`;
  };

  const onSubmit = async (data) => {
    const url = isSignedUp
      ? `${API_BASE_URL}/get-started`
      : `${API_BASE_URL}/login`;
    const payload = isSignedUp
      ? {
          ...data,
          username: generateUsername(data.firstName, data.lastName),
        }
      : data;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok) {
        if (result.token) {
          localStorage.setItem("JWT", result.token);
        }
        toast.success(`${result.message}`, { duration: 900 });
        setTimeout(() => {
          navigate("/");
          login();
        }, 950);
      } else if (response.status === 409) {
        toast.error(result.message);
      } else if (response.status === 404) {
        toast.error(result.message);
      } else if (response.status === 401) {
        toast.error(result.message);
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
      <div className="mt-12 w-full  px-4 sm:px-6 md:px-8">
        <div className="max-w-xl mx-auto mt-4 sm:mt-6 md:mt-8 p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-sm mb-4 sm:mb-6 md:mb-8 dark:bg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-purple-700 dark:text-purple-600">
            {isSignedUp ? "Sign Up" : "Log In"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {isSignedUp && (
              <React.Fragment>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium text-sm sm:text-base">
                      First Name
                    </label>
                    <input
                      placeholder="Enter Your First Name"
                      {...register("firstName", {
                        required: "First name is required.",
                      })}
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block mb-1 font-medium text-sm sm:text-base">
                      Last Name
                    </label>
                    <input
                      placeholder="Enter Your Last Name"
                      {...register("lastName", {
                        required: "Last name is required.",
                      })}
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )}

            <div>
              <label className="block mb-1 font-medium text-sm sm:text-base">
                Enter Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { required: "Email is required." })}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-sm sm:text-base">
                Enter Password
              </label>
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
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 sm:top-10 right-3 sm:right-5 text-gray-400 cursor-pointer"
              >
                {showPassword ? (
                  <Eye size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <EyeOff size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {isSignedUp && (
              <React.Fragment>
                <div className="relative">
                  <label className="block mb-1 font-medium text-sm sm:text-base">
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
                    className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
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
                    className="absolute top-9 sm:top-10 right-3 sm:right-5 text-gray-400 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <Eye size={18} className="sm:w-5 sm:h-5" />
                    ) : (
                      <EyeOff size={18} className="sm:w-5 sm:h-5" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </React.Fragment>
            )}
            <button
              type="submit"
              className="text-base sm:text-lg md:text-xl w-full mt-3 py-2 sm:py-2.5 rounded-lg mx-auto text-white font-bold bg-fuchsia-600 cursor-pointer hover:bg-fuchsia-700 transition-colors"
            >
              {isSignedUp ? "Sign Up " : "Login"}
            </button>
          </form>

          <p
            onClick={ToggleLink}
            className="text-center text-sm sm:text-base text-blue-500 mt-3 sm:mt-4 items-center cursor-pointer hover:underline"
          >
            {isSignedUp
              ? "Already have an account? Login"
              : "Don't have an Account? Sign Up"}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default GetStarted;
