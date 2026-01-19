import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

import { FloatingIcons } from "../../components/FloatingIcons";

import { ScrollLine } from "../../animations/ScrollingLine";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../context/useAuthStore";

const LoadingSuspense = lazy(() => import("../../components/LoadingSuspense"));

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ReadMore = lazy(() => import("../../components/ReadMore"));

const FullStack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(auth);
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
        <FloatingIcons />

        <h1 className="flex justify-center items-center">
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
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-3xl text-lg font-semibold sm:text-xl text-muted-foreground mx-auto"
        >
          <span className="bg-linear-to-tr from-gray-500 to-gray-800  text-center block max-w-3xl mx-auto bg-clip-text text-transparent">
            Master every layer of modern web development—from crafting intuitive
            frontends to architecting scalable backends exploring DB's,
            APIs, Cloud infrastructure.
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
              <Grid container spacing={4} padding={5}>
                {data.map((post) => (
                  <Card
                    key={post.id}
                    sx={{ minWidth: 425, maxWidth: 425 }}
                    variant="outlined"
                  >
                    <CardMedia sx={{ height: 200 }} image={post.image} />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        alignItems={"center"}
                        textAlign={"center"}
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="body2" maxHeight={400}>
                        {post.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        component={Link}
                        to={`post/${post.id}`}
                        state={{ post }}
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Grid>
            )}
          </Suspense>
        </div>
      </main>
    </React.Fragment>
  );
};
export default FullStack;
