import React from "react";
import { Link } from "react-router-dom";
import { postData } from "../../data/posts";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const FullStack = () => {
  const filteredPosts = postData.filter(
    (post) => post.category === "fullstack"
  );

  return (
    <React.Fragment>
      <div >
        <h1 className="flex items-center justify-center text-3xl py-4 font-medium text-sky-800">Full Stack Development Posts</h1>
        {console.log(filteredPosts)}
        <Grid container spacing={4} padding={5}>
          {filteredPosts.map((post) => (
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
