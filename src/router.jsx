import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import CategoryLayout from "./layouts/CategoriesLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import FullStack from "./pages/CategoryPages/FullStack";
import Backend from "./pages/CategoryPages/Backend";
import Mobile from "./pages/CategoryPages/Mobile";
import AIandML from "./pages/CategoryPages/AI&ML";
import QA from "./pages/CategoryPages/QA";

import NotFound from "./components/NotFound";
import AiandML from "./pages/CategoryPages/AI&ML";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  {
    path: "categories",
    element: <CategoryLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "fullstack", element: <FullStack /> },
      { path: "backend", element: <Backend /> },
      { path: "mobile", element: <Mobile /> },
      { path: "ai&ml", element: <AiandML /> },
      { path: "qa", element: <QA /> },
    ],
  },
]);
export default router;
