import React, { useState } from "react";
import { useForm } from "react-hook-form";
const GetStarted = () => {
  const [isSignedUp, setIsSignedUp] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    isSignedUp
      ? console.log("Login Data:", data)
      : console.log("Forms Data:", data);
  };
  const ToggleLink = () => {
    setIsSignedUp(!isSignedUp);
  };

  return (
    <React.Fragment>
      <div className="form-container ">
        <h2>{isSignedUp ? "Sign Up" : "Log In"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name and Last Name */}
          {isSignedUp && (
            <React.Fragment>
              <input type="text" placeholder="Enter Your First Name" />
              <input type="text" placeholder="Enter Your Last Name" />
            </React.Fragment>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: "Email is required." })}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Password is required!",
              minLength: 6,
            })}
          />

          {isSignedUp && (
            <React.Fragment>
              {/* Confirm Password */}
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Pls confirm your password!",
                })}
              />
            </React.Fragment>
          )}
          <button type="sumbit">{isSignedUp ? "Sign Up " : "Login"}</button>
        </form>

        <p onClick={ToggleLink}>
          {isSignedUp
            ? "Already have an account? Login"
            : "Don't have and account? Sign Up"}
        </p>
      </div>
    </React.Fragment>
  );
};
export default GetStarted;
