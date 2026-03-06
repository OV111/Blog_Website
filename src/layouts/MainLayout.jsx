import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const MainLayout = () => {
  return (
    // bg-zinc-100
    // dark:bg-gray-900
    <div className="bg-zinc-100 dark:bg-gray-950 min-h-screen">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
