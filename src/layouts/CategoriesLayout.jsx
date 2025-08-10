import React from "react";
import { Outlet } from "react-router-dom";
import CategoryNavbar from "../components/CategoryNavbar";
import Footer from "../components/Footer";
const CategoryLayout = () => {
  return (
    <React.Fragment>
      <div className="bg-zinc-100 dark:bg-gray-900">
        <CategoryNavbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default CategoryLayout;
