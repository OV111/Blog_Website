import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ReadMore = () => {
  const location = useLocation();
  const [clicked, setClicked] = useState(false);
  const [post, setPost] = useState(""); //with {title:""} with default values (avoid crashes)
  //   console.log(location);
  const { id } = useParams();
  console.log(location.pathname)
  useEffect(() => {
    if(location.state && location.state.post) {
      setPost(location.state.post)
    }
  },[location.state])
  return (
    <React.Fragment>
      <p>{post.title}</p>
      <h1>Category: {post.category}</h1>
      <p>{post.description}</p>
      <p>Time: {post.readTime}</p>
      {id}
    </React.Fragment>
  );
};
export default ReadMore;
