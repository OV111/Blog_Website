import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";

const ProtectedRoutes = ({children}) => {
  const token = localStorage.getItem("JWT");

  const { auth } = useAuthStore();
    if(auth || token) {
        return <Navigate to='/get-started' />
    }
    return children
};
export default ProtectedRoutes;