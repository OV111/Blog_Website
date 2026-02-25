import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useAuthStore from "../../context/useAuthStore";
import { motion } from "framer-motion";

import { FloatingIcons } from "../../components/FloatingIcons";
const LoadingSuspense = lazy(() => import("../../components/LoadingSuspense"));
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DevOps = () => {
  const { auth } = useAuthStore();
  const [categoryPage, setCategoryPage] = useState("devops");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchingPosts = async () => {
    const url = auth
      ? `${VITE_API_BASE_URL}/categories/devops`
      : `${VITE_API_BASE_URL}/categories/devops/default`;
    const request = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
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
            <div className="grid justify-center items-center text-center">
              <span className="mx-auto mb-1 bg-linear-to-l from-purple-500 to-purple-800 bg-clip-text text-transparent">
                Development
              </span>
              <span className="bg-linear-to-r from-purple-800 to-purple-400 bg-clip-text text-transparent">
                Operations
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
            Design and operate resilient infrastructure—build automated CI/CD
            pipelines, architect scalable cloud environments, optimize
            containerized workloads, implement infrastructure as code, enforce
            security and compliance policies, and ensure high availability
            through monitoring, observability, and proactive incident response
          </span>
        </motion.p>
      </header>
      <div>
        <Suspense fallback={<LoadingSuspense></LoadingSuspense>}>
          {loading ? (
            <LoadingSuspense />
          ) : (
            <Grid container spacing={4} padding={5}>
              {data.map((post) => (
                <Card sx={{ minWidth: 425, maxWidth: 425 }} variant="outlined">
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
    </React.Fragment>
  );
};
export default DevOps;
