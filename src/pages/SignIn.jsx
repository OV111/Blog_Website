import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
const SignIn = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    console.log("yesss")
    if (username && password) {
      console.log("avhe");
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="grid  px-100 py-10">
        <input
          type="text"
          className="my-6"
          placeholder="Enter Your UserName"
          onClick={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          className="my-6"
          placeholder="Enter Your Password"
          onClick={(e) => setPassword(e.target.value)}
        />
        {/* <input type="text" /> */}
        <button type="submit" className="cursor-pointer">
          Log In
        </button>
      </form>
    </React.Fragment>
  );
};
export default SignIn;
