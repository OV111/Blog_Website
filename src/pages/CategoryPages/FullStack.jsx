/* This code snippet is a React component named `FullStack` that represents a page for displaying full
stack development content. Here's a breakdown of what the code is doing: */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { FloatingIcons } from "../../components/FloatingIcons";
import { ScrollLine } from "../../animations/ScrollingLine";
import useAuthStore from "../../stores/useAuthStore";

const LoadingSuspense = lazy(() => import("../../components/LoadingSuspense"));

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ReadMore = lazy(() => import("../../components/ReadMore"));

const FullStack = () => {
  const [categoryPage, setCategoryPage] = useState("fullstack");
  const { auth } = useAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      let url = auth
        ? `${VITE_API_BASE_URL}/categories/fullstack`
        : `${VITE_API_BASE_URL}/categories/fullstack/default`;

      const request = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });

      const response = await request.json();
      setData(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      <header className="min-h-screen mt-40">
        {/* <h1 className="flex justify-center items-center text-xl font-medium text-sky-800 py-6 sm:text-2xl md:text-4xl lg:text-5xl">
          Full Stack Development
        </h1> */}
        <FloatingIcons category={categoryPage} />

        <div className="flex justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className=" text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
          >
            <div className="grid justify-center items-center">
              <span className="mx-auto mb-1 bg-linear-to-l from-purple-500 to-purple-800 bg-clip-text text-transparent">
                Full Stack
              </span>
              <span className="bg-linear-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">
                Development
              </span>
            </div>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-3xl text-lg font-semibold sm:text-xl text-muted-foreground mx-auto"
        >
          <span className="bg-gradient-to-r from-gray-600 via-purple-600 to-indigo-400 text-center block max-w-3xl mx-auto bg-clip-text text-transparent">
            Master every layer of modern web development—from crafting intuitive
            frontends to architecting scalable backends exploring DB's, APIs,
            Cloud infrastructure.
          </span>
        </motion.p>
      </header>
      <main>
        <aside className="fixed left-0 top-0">
          <ScrollLine />
        </aside>
        <div>
          <Suspense fallback={<LoadingSuspense></LoadingSuspense>}>
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
      </main>
    </React.Fragment>
  );
};
export default FullStack;
