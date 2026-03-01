import React, { lazy, Suspense, useEffect, useState } from "react";
import useAuthStore from "../../context/useAuthStore";
import { motion } from "framer-motion";

import BlogCard from "../../components/BlogCard";

import { FloatingIcons } from "../../components/FloatingIcons";
const LoadingSuspense = lazy(() => import("../../components/LoadingSuspense"));

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const backendTags = [
  "Node.js",
  "Express",
  "REST API",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Authentication",
  "Docker",
  "MongoDB",
  "Authentication",
  "Docker",
  "MongoDB",
  "Authentication",
  "Docker",
];

const Backend = () => {
  const { auth } = useAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchingPosts = async () => {
    const url = auth
      ? `${VITE_API_BASE_URL}/categories/backend`
      : `${VITE_API_BASE_URL}/categories/backend/default`;
    const request = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
      <header className="min-h-screen pt-40">
        <FloatingIcons category={"backend"} />

        <h1 className="flex justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className=" text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
          >
            <div className="grid justify-center items-center">
              <span className="mx-auto mb-1 bg-linear-to-l from-purple-500 to-purple-800 bg-clip-text text-transparent">
                Backend
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
            Develop robust server-side applications—craft scalable APIs and web
            services, design efficient database schemas across relational and
            NoSQL systems, implement secure authentication and authorization
            mechanisms
          </span>
        </motion.p>
      </header>

      <section className="mx-auto py-20">
        <div className="rounded-3xl  px-6 py-8">
          <p className="text-center text-2xl font-bold uppercase tracking-[4px] text-purple-700">
            Browse by Technology
          </p>
          <p className="bg-gradient-to-r from-slate-400 via-purple-600 to-indigo-400 text-transparent bg-clip-text mx-auto mt-3 lg:w-md lg:max-w-2xl text-center text-base font-medium sm:text-lg">
            Discover content across the backend spectrum Click any tag to
            explore related topics
          </p>

          <div className="mt-6 flex flex-wrap lg:mx-20 justify-center gap-3">
            {backendTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800 transition hover:bg-purple-700 hover:text-white dark:bg-purple-800 dark:text-white "
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Best Blogs of the month */}
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
    </React.Fragment>
  );
};
export default Backend;
