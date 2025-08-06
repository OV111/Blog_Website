import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import CategoryLayout from "./layouts/CategoriesLayout"

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import FullStack from "./pages/CategoryPages/FullStack";
import Backend from "./pages/CategoryPages/Backend";
import QA from "./pages/CategoryPages/QA";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
        </Route>

        <Route path="/categories" element={<CategoryLayout />}>
          <Route path="fullstack" element={<FullStack />} />
          <Route path="backend" element={<Backend />} />
          <Route path="categories"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
