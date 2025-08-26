import React, { useState } from "react";
import { useForm } from "react-hook-form";

const GetStarted = () => {
  const [isSignedUp, setIsSignedUp] = useState(true);

  const {register,handleSubmit,getValues,formState: { errors },} = useForm();

  const onSubmit = (data) => {
    isSignedUp
      ? console.log("Forms Data:", data)
      : console.log("Login Data:", data);
  };
  const ToggleLink = () => {
    setIsSignedUp(!isSignedUp);
  };

  return (
    <React.Fragment>
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
          <label className="block mb-1 font-medium">Enter Password</label>
          <input
            type="password"
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {isSignedUp && (
            <React.Fragment>
              {/* Confirm Password */}
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password!",
                  message: "Passwords must match!",
                  validate: (value) => {
                    return value === getValues("password") || "Password don't match!";
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
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
