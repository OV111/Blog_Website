import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/useAuthStore";

const ProtectedMyProfile = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useAuthStore();

  useEffect(() => {
    if (!auth) {
      navigate("/get-started");
    }
  }, [auth, navigate]);


  return children;
};

export default ProtectedMyProfile;