import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = () => {
    const [isAuthenticated,setIsAuthenticated] = useState(false)

    const login = (username,password) => {

    }

    const value = {isAuthenticated}
    return (
        <AuthContext.Provider value={value}>

        </AuthContext.Provider>
    )
}
export default AuthProvider;