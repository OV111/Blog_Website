import useThemeStore from "@/stores/useThemeStore";

const LoadingSuspense = () => {
  const { theme } = useThemeStore();
  return (
    <div
      className={`flex items-center justify-center min-h-screen ${theme === "light" ? "bg-zinc-100" : "bg-gray-950"}  `}
    >
      <div className="flex flex-col justify-center items-center space-y-5">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-300 rounded-full animate-spin border-t-purple-600"></div>
          <div
            className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin border-t-purple-400"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <div className="text-center">
          <h3
            className={`justify-center items-center text-2xl font-semibold ${theme === "light" ? "text-gray-700" : "text-gray-100"} mb-1`}
          >
            Almost there...
          </h3>
          <p
            className={`justify-center items-center text-lg  ${theme === "light" ? "text-gray-500" : "text-gray-100"} `}
          >
            Fetching the latest from the community
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSuspense;
