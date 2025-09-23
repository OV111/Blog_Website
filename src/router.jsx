import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import CategoryLayout from "./layouts/CategoriesLayout";
import ProtectedMyProfile from "./routes/ProtectedMyProfile";
// import ProtectedRoutes from "./routes/ProtectedRoutes";

// My Profile
const Followers = lazy(() => import("./pages/My-Profile/Followers"));
const Favorites = lazy(() => import("./pages/My-Profile/Favorites"));
const Notifications = lazy(() => import("./pages/My-Profile/Notifications"));
const Settings = lazy(() => import("./pages/My-Profile/Settings"));
const AddBlog = lazy(() => import("./pages/My-Profile/AddBlog"))

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const GetStarted = lazy(() => import("./pages/GetStarted"));

const FullStack = lazy(() => import("./pages/CategoryPages/FullStack"));
const Backend = lazy(() => import("./pages/CategoryPages/Backend"));
const Mobile = lazy(() => import("./pages/CategoryPages/Mobile"));
const AIandML = lazy(() => import("./pages/CategoryPages/AI&ML"));
const QA = lazy(() => import("./pages/CategoryPages/QA"));
const DevOps = lazy(() => import("./pages/CategoryPages/DevOps"));

const NotFound = lazy(() => import("./components/NotFound"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "get-started", element: <GetStarted /> },
      {
        path: "my-profile",
        children: [
          {
            index: true,
            element: (
              <ProtectedMyProfile>
                <MyProfile />
              </ProtectedMyProfile>
            ),
          },
          {
            path: "settings",
            element: (
              <ProtectedMyProfile>
                <Settings />
              </ProtectedMyProfile>
            ),
          },
          {
            path: "followers",
            element: (
              <ProtectedMyProfile>
                <Followers />
              </ProtectedMyProfile>
            ),
          },
          {
            path: "add-blog",
            element: (
              <ProtectedMyProfile>
                <AddBlog />
              </ProtectedMyProfile>
            ),
          },
          {
            path: "notifications",
            element: (
              <ProtectedMyProfile>
                <Notifications />
              </ProtectedMyProfile>
            ),
          },
          {
            path: "favourites",
            element: (
              <ProtectedMyProfile>
                <Favorites />
              </ProtectedMyProfile>
            ),
          },
        ],
      },
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
      { path: "devops", element: <DevOps /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
export default router;
