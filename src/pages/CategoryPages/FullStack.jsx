import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const FullStack = () => {



const fetchPosts = async () => {
  const request = await fetch(`${VITE_API_BASE_URL}/categories/fullstack`, {
      method: "GET",
      headers: {"content-type" : "application/json"},
      credentials: 'include'
    })

    const response = await request.json()
    console.log(response)
  }

  useEffect(() => {
    fetchPosts()
    
  },[])

  return (
    <React.Fragment>
      <div >
        <h1 className="flex items-center justify-center text-3xl py-4 font-medium text-sky-800">Full Stack Development Posts</h1>
        
        <Grid container spacing={4} padding={5}>
          {[].map((post) => (
            <Card sx={{ minWidth: 425, maxWidth:425}} variant="outlined">
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
              <CardActions >  
                <Button
                size="small"
                component={Link}
                to={``}
                >
                    Read More 
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </div>
    </React.Fragment>
  );
};
export default FullStack;
