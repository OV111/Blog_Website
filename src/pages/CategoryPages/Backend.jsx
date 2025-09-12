import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const Backend = () => {
  const fetchingPosts = async () => {
    const request = await fetch(`${VITE_API_BASE_URL}/categories/backend`, {
        method: "GET",
        headers:{"Content-Type" : "application/json"}
    }); 

    const response = await request.json();
    console.log(response);
  };

  useEffect(() => {
    fetchingPosts();
  }, []);
  return <h1>Backend Development</h1>;
};
export default Backend;
