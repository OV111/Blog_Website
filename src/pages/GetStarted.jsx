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
  const [authUiMessage, setAuthUiMessage] = useState("");
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
    setAuthUiMessage("");
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
        setAuthUiMessage(result.message);
        toast.error(result.message);
      } else if (response.status === 404) {
        setAuthUiMessage(result.message);
        toast.error(result.message);
      } else if (response.status === 401) {
        setAuthUiMessage(result.message);
        toast.error(result.message);
      } else if (response.status === 429) {
        setAuthUiMessage(
          result.message || "Too many login attempts. Please try again later.",
        );
      } else {
        setAuthUiMessage(result.message || "Request failed");
        toast.error(result.message || "Request failed");
      }
    } catch (err) {
      console.error(err);
      setAuthUiMessage("Server is unavailable. Please try again later.");
      toast.error("Server is unavailable. Please try again later!", {
        duration: 2500,
      });
    }
    reset();
  };

  const ToggleLink = () => {
    setIsSignedUp(!isSignedUp);
    setAuthUiMessage("");
    reset();
  };

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between">
        <div className="w-[100%]">

        </div>
        <div className="mt-0 w-full px-4 sm:px-6 md:px-8">
          <div className="mx-auto mt-0 mb-0 max-w-xl rounded-2xl border border-violet-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-gray-950 dark:shadow-2xl dark:shadow-black/30 sm:mt-6 sm:mb-6 sm:p-6 md:mt-8 md:mb-8 md:p-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-purple-700 dark:text-purple-600">
              {isSignedUp ? "Sign Up" : "Log In"}
            </h2>
            {authUiMessage && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                {authUiMessage}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {isSignedUp && (
                <React.Fragment>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium text-sm text-slate-700 dark:text-zinc-200 sm:text-base">
                        First Name
                      </label>
                      <input
                        placeholder="Enter Your First Name"
                        {...register("firstName", {
                          required: "First name is required.",
                        })}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none  dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 sm:px-4 sm:text-base ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300 dark:border-zinc-700"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="block mb-1 font-medium text-sm text-slate-700 dark:text-zinc-200 sm:text-base">
                        Last Name
                      </label>
                      <input
                        placeholder="Enter Your Last Name"
                        {...register("lastName", {
                          required: "Last name is required.",
                        })}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 sm:px-4 sm:text-base ${
                          errors.lastName
                            ? "border-red-500"
                            : "border-gray-300 dark:border-zinc-700"
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
                <label className="block mb-1 font-medium text-sm text-slate-700 dark:text-zinc-200 sm:text-base">
                  Enter Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("email", { required: "Email is required." })}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 sm:px-4 sm:text-base ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-zinc-700"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block mb-1 font-medium text-sm text-slate-700 dark:text-zinc-200 sm:text-base">
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
                  className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:outline-none dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 sm:px-4 sm:pr-12 sm:text-base ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-zinc-700"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 cursor-pointer text-gray-400 dark:text-zinc-500 sm:top-10 sm:right-5"
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
                    <label className="block mb-1 font-medium text-sm text-slate-700 dark:text-zinc-200 sm:text-base">
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
                      className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:outline-none  dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 sm:px-4 sm:pr-12 sm:text-base ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300 dark:border-zinc-700"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      className="absolute top-9 right-3 cursor-pointer text-gray-400 dark:text-zinc-500 sm:top-10 sm:right-5"
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
              className="mt-3 items-center cursor-pointer text-center text-sm text-blue-500 hover:underline dark:text-fuchsia-300 sm:mt-4 sm:text-base"
            >
              {isSignedUp
                ? "Already have an account? Login"
                : "Don't have an Account? Sign Up"}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default GetStarted;
