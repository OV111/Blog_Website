import React from "react";
import { Link } from "react-router-dom";
import TextType from "../components/TextType";
// import ShinyText from "../components/ShinyText";
import GradientText from "../components/GradientText";
import { Toaster } from "react-hot-toast";
import useAuthStore from "../context/useAuthStore";
import heroIllustration from "../assets/Code typing-bro (1).svg";

const Home = () => {
  const { auth } = useAuthStore();

  return (
    <div className="relative flex justify-between gap-8 lg:gap-24 lg:min-h-screen mr-0 lg:mx-auto overflow-hidden">
      {/* <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-200/50 blur-3xl" /> */}
      {/* <div className="pointer-events-none absolute top-10 right-10 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" /> */}
      <div>
        <Toaster
          position="right-bottom"
          reverseOrder={false}
          className="wide-toast-container"
        ></Toaster>

        {/* 94 for width*/}
        <section className="relative z-10 flex flex-col gap-2 sm:gap-8 lg:gap-8 mt-[100px] mb-20 lg:mb-[350px] ml-8 sm:ml-[40px] md:ml-[60px] max-w-4xl">
          <div className="max-w-[280px] sm:max-w-[760px] h-20 lg:h-36">
            <h1 className="lg:ml-0  font-medium text-purple-800 dark:text-purple-600 text-xl sm:text-5xl lg:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_6px_24px_rgba(126,34,206,0.15)]">
              <TextType
                text={[
                  "Welcome to Developers Platform.",
                  "Level up your dev skills,",
                  "Created by Devs for Devs!",
                ]}
                typingSpeed={109}
                pauseDuration={1700}
                showCursor={true}
                cursorCharacter="|"
              />
            </h1>
          </div>
          {/* <div className=""> */}
          <GradientText
            colors={["#8A2BE2", "#FF1493", "#FF00FF", "#9c40ff", "#00FF00"]}
            animationSpeed={8}
            showBorder={false}
            className="mt-4 ml-2 px-1 py-1 w-[300px] md:w-[420px] lg:w-full font-medium text-xl sm:text-xl md:text-2xl lg:text-[40px] text-start"
          >
            A place to read, teach, write and understand topics.
          </GradientText>
          {/* </div> */}
          <div className="flex mt-0 justify-start items-center">
            <button className=" bg-fuchsia-700 hover:bg-fuchsia-600 hover:shadow-lg ml-3 px-6 lg:px-10 py-1 lg:py-2 border border-fuchsia-600/70 rounded-xl font-medium text-gray-100 hover:text-white text-lg lg:text-2xl transition-all duration-200 hover:scale-105 cursor-pointer transform">
              <Link to={auth ? "my-profile" : "get-started"}>Get Started</Link>
              {/* <ShinyText
                text="Start Reading"
                disabled={false}
                speed={3}
                className="font-semibold text-white"
              /> */}
            </button>
            <button className=" bg-fuchsia-100 hover:bg-fuchsia-200 dark:bg-fuchsia-900/30 dark:hover:bg-fuchsia-900/50 hover:shadow-lg  ml-3 px-6 lg:px-6 py-1 lg:py-2 border border-fuchsia-300 dark:border-fuchsia-700 rounded-xl font-medium text-fuchsia-800 dark:text-fuchsia-200 hover:text-fuchsia-900 dark:hover:text-fuchsia-100 text-lg lg:text-2xl transition-all duration-200 hover:scale-105 cursor-pointer transform">
              <Link to={auth ? "my-profile" : "get-started"}>
                Explore Content
              </Link>
              {/* <ShinyText
                text="Start Reading"
                disabled={false}
                speed={3}
                className="font-semibold text-white"
              /> */}
            </button>
          </div>
        </section>
      </div>
      <div className="px-4 relative right-0 top-0 hidden lg:block">
        <img
          src={heroIllustration}
          alt="hero illustration"
          className="lg:w-[650px] mt-10 drop-shadow-2xl dark:drop-shadow-lg dark:drop-shadow-purple-600"
        />
      </div>
    </div>
  );
};

export default Home;
