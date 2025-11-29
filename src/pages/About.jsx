import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const fetchdata = async () => {
      const request = await fetch("http://localhost:5000/about", {
        method: "GET",
        headers: { "content-type": "text/plain" },
      });
      const response = await request()
      console.log(response)
    };
    fetchdata()
  },[]);

  return (
    <div className="container min-h-screen">
      <h1 className="relative flex justify-center items-center text-xl font-medium text-sky-800 py-6 sm:text-2xl md:text-4xl lg:text-5xl">
        About Page
      </h1>
      <div className="static top-30 left-30">
        <p>This page shows up information about Devs Blog </p>
        <p>What is it about!</p>
        <p>What is the missions</p>
        <p>About the team(programmers)</p>
        <p>Future plans</p>
        <p>Social Contacts</p>
      </div>
    </div>
  );
};
export default About;
