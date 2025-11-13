import React, { lazy, Suspense, useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const LoadingSuspense = lazy(() => import("../../components/LoadingSuspense"));

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FullStack = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams()


  useEffect(() => {
    console.log(params)
    const fetchPosts = async () => {
      try {
        const request = await fetch(
          `${VITE_API_BASE_URL}/categories/fullstack`,
          {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
          }
        );

        const response = await request.json();
        setData(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      <h1 className="flex justify-center items-center text-xl font-medium text-sky-800 py-6 sm:text-2xl md:text-4xl lg:text-5xl">
        Full Stack Development Posts
      </h1>
      <div>
        <Suspense fallback={<LoadingSuspense></LoadingSuspense>}>
          {loading ? (
            <LoadingSuspense></LoadingSuspense>
          ) : (
            <Grid container spacing={4} padding={5}>
              {data.map((post) => (
                <Card sx={{ minWidth: 425, maxWidth: 425 }} variant="outlined">
                  <CardMedia
                    sx={{ height: 200, width: 300 }}
                    image={post.image}
                  />
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
                    <Button size="small" component={Link} to={``}>
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
export default FullStack;
