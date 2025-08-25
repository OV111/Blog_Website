import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import CategoryLayout from "./layouts/CategoriesLayout";
import NotFound from "./components/NotFound";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

const FullStack = lazy(() => import("./pages/CategoryPages/FullStack"));
const Backend = lazy(() => import("./pages/CategoryPages/Backend"));
const Mobile = lazy(() => import("./pages/CategoryPages/Mobile"));
const AIandML = lazy(() => import("./pages/CategoryPages/AI&ML"));
const QA = lazy(() => import("./pages/CategoryPages/QA"));


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
      { path: "ai&ml", element: <AIandML /> },
      { path: "qa", element: <QA /> },
    ],
  },
]);
export default router;
