import React, { useEffect } from "react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import TextType from "../components/TextType";
import ShinyText from "../components/ShinyText";
import GradientText from "../components/GradientText";
import LoadingSuspense from "../components/LoadingSuspense";

import { Toaster, toast } from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// import SplashCursor from "../components/SplashCursor";
const SplashCursor = lazy(() => import("../components/SplashCursor"));

const Home = () => {
  const acceptCookies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/accept-cookies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accepted: true }),
        credentials: "include",
      });

      let result = await response.json();
      if (response.ok) {
        console.log(result);
        toast.dismiss();
      }
    } catch (err) {
      console.error("Failed sending cookies", err);
    }
  };

  // useEffect(() => {
  //   if (!document.cookie.includes("cookiesAccepted=true")) {
  //     toast(
  //       <div className="gap-3 grid mx-auto">
  //         <h1 className="pt-2 font-bold text-xl text-center">
  //           We use Cookies 🍪
  //         </h1>
  //         <p className="font-medium text-gray-600 text-lg">
  //           We use cookies to enhance your experience. By continuing to visit
  //           this site, you agree to our use of cookies.
  //         </p>
  //         <button
  //           className="bg-purple-600 hover:bg-fuchsia-600 py-2 rounded-xl w-full text-white hover:text-white hover:scale-102 cursor-pointer transform"
  //           onClick={() => {
  //             acceptCookies()
  //           }}
  //         >
  //           Accept Cookies
  //         </button>
  //       </div>,
  //       {
  //         duration: Infinity,
  //       }
  //     );
  //   }
  // }, []);

  return (
    <React.Fragment>
      <div className="flex gap-30 lg:min-h-screen">
        <div>
          <Toaster
            position="right-bottom"
            reverseOrder={false}
            className="wide-toast-container"
          ></Toaster>
          <Suspense fallback={<LoadingSuspense />}>
            {/* <SplashCursor/> */}
          </Suspense>
          {/* 94 for width*/}
          <section className="flex flex-col gap-2 sm:gap-8 lg:gap-10 mt-[100px] mb-[350px] ml-8 sm:ml-[40px] md:ml-[60px] lg:ml-[80px] max-w-4xl">
            <div className="max-w-43 lg:max-w-143 h-20 lg:h-35">
              <h1 className="ml-2 lg:ml-0 lg:pl-4 font-medium text-purple-800 dark:text-purple-600 text-xl sm:text-5xl lg:text-5xl md:text-6xl lg:text-7xl">
                <TextType
                  text={[
                    "Welcome to Developers blog.",
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
              className="mt-4 ml-2 px-1 py-1 w-[300px] md:w-[200] lg:w-[100%] font-medium text-xl sm:text-xl md:text-2xl lg:text-3xl text-start"
            >
              A place to read, write and understand topics.
            </GradientText>
            {/* </div> */}
            <div>
              <button className="justify-center items-center bg-fuchsia-700 hover:bg-fuchsia-600 dark:bg-fuchsia-550 hover:shadow-lg mt-2 lg:mt-2 ml-3 px-6 lg:px-10 py-1 lg:py-2 border-none rounded-xl font-medium text-gray-100 text-whitetransition hover:text-white text-lg lg:text-2xl hover:scale-102 cursor-pointer transform">
                <Link to="get-started">Start Reading</Link>
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
        <div>
          <img
            src="src/assets/componentImage.png"
            alt="image"
            className="w-120 h-120"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
