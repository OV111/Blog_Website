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
  //       <div className="grid mx-auto gap-3">
  //         <h1 className="text-xl font-bold text-center pt-2">
  //           We use Cookies 🍪
  //         </h1>
  //         <p className="text-lg  text-gray-600 font-medium">
  //           We use cookies to enhance your experience. By continuing to visit
  //           this site, you agree to our use of cookies.
  //         </p>
  //         <button
  //           className="bg-purple-600 w-full rounded-xl py-2 text-white  cursor-pointer hover:bg-fuchsia-600 transform  hover:scale-102 hover:text-white"
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
      <div className="lg:min-h-screen">
      <div>
        <Toaster
          position="right-bottom"
          reverseOrder={false}
          className="wide-toast-container"
        ></Toaster>
        <Suspense fallback={<LoadingSuspense></LoadingSuspense>}>
          {/* <SplashCursor/> */}
        </Suspense>
        <section className="mt-[100px] mb-[350px] ml-8 flex flex-col gap-2 sm:gap-8 lg:gap-10 max-w-4xl sm:ml-[40px] md:ml-[60px] lg:ml-[80px] ">
          <div className="w-94 h-20 lg:w-146 lg:h-35 ">
            <h1 className="text-5xl  font-medium ml-2 text-purple-800  sm:text-5xl md:text-6xl  lg:text-7xl lg:pl-4 lg:ml-0">
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
              className="text-start w-[300px]  ml-2 text-xl mt-4 py-1 px-1 sm:text-xl md:text-2xl md:w-[200] lg:text-3xl lg:w-[100%]"
            >
              A place to read, write and understand topics.
            </GradientText>
          {/* </div> */}
          <div>
            <button className="items-center justify-center  ml-3 mt-2 px-6 py-1 text-lg rounded-xl text-gray-100 border-none bg-fuchsia-700 text-whitetransition cursor-pointer hover:bg-fuchsia-600 transform  hover:scale-102 hover:shadow-lg hover:text-white dark:bg-fuchsia-550 lg:px-10 lg:py-2 lg:text-2xl lg:mt-2">
              <Link to="get-started">Start Reading</Link>
              {/* <ShinyText
                text="Start Reading"
                disabled={false}
                speed={3}
                className="text-white font-semibold"
              /> */}
            </button>
          </div>
        </section>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
