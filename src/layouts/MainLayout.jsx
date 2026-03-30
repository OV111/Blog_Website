import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Toaster } from "react-hot-toast";
const MainLayout = () => {
  return (
    <div className="bg-zinc-100 dark:bg-gray-950 min-h-screen">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      {/* Initial fix remove from individual pages the Toaster and leave it here */}
      {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
    </div>
  );
};
export default MainLayout;
