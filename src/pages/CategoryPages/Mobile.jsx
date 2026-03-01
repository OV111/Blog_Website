import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import BlogCard from "@/components/BlogCard";

import { motion } from "framer-motion";

import { FloatingIcons } from "../../components/FloatingIcons";
import useAuthStore from "../../context/useAuthStore";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoadingSuspense = lazy(() => import("../../components/LoadingSuspense"));

const Mobile = () => {
  const [categoryPage, setCategoryPage] = useState("mobile");
  const { auth } = useAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchingPosts = async () => {
    const url = auth
      ? `${VITE_API_BASE_URL}/categories/mobile`
      : `${VITE_API_BASE_URL}/categories/mobile/default`;
    const request = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "Application/json" },
    });
    const response = await request.json();
    setData(response);
    setLoading(false);
  };
  useEffect(() => {
    fetchingPosts();
  }, []);
  return (
    <React.Fragment>
      <header className="min-h-screen mt-40">
        <FloatingIcons category={categoryPage} />

        <h1 className="flex justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className=" text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
          >
            <div className="grid justify-center items-center">
              <span className="mx-auto mb-1 bg-linear-to-l from-purple-500 to-purple-800 bg-clip-text text-transparent">
                Mobile
              </span>
              <span className="bg-linear-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">
                Development
              </span>
            </div>
          </motion.h1>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-6 max-w-3xl text-lg font-semibold sm:text-xl text-muted-foreground mx-auto"
        >
          <span className="bg-gradient-to-r from-slate-400 via-purple-600 to-indigo-400 text-center block max-w-3xl mx-auto bg-clip-text text-transparent">
            Explore modern mobile development from end to end — craft
            responsive, user-friendly interfaces, handle data and APIs, and
            connect your apps to scalable, cloud-powered backends.
          </span>
        </motion.p>
      </header>

      <div>
        <Suspense fallback={LoadingSuspense}>
          {loading ? (
            <LoadingSuspense></LoadingSuspense>
          ) : (
            <div className="flex flex-wrap justify-center gap-10 px-2 pb-10 lg:px-0">
              {data.map((card) => (
                <BlogCard key={card.id} card={card} />
              ))}
            </div>
          )}
        </Suspense>
      </div>
    </React.Fragment>
  );
};
export default Mobile;
