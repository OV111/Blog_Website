import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const LoadingSuspense = lazy(() => import("../../components/LoadingSuspense"));
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AiandML = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingPosts = async () => {
      const request = await fetch(`${VITE_API_BASE_URL}/categories/ai&ml`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await request.json();
      setData(response);
      setLoading(false);
    };
    fetchingPosts();
  }, []);
  return (
    <React.Fragment>
      <h1>AI and Machine Learning</h1>
      <div>
        <Suspense fallback={LoadingSuspense}>
          {loading ? (
            <LoadingSuspense></LoadingSuspense>
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
export default AiandML;
