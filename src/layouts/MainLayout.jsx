import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const MainLayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div >
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default MainLayout;
