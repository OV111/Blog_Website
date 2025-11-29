const LoadingSuspense = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100">
      <div className="flex flex-col justify-center items-center space-y-5">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-300 rounded-full animate-spin border-t-purple-600"></div>
          <div
            className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin border-t-purple-400"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <div className="text-center">
          <h3 className="justify-center items-center text-2xl font-semibold text-gray-700 mb-1">
            Loading . . .
          </h3>
          <p className="justify-center items-center text-lg text-gray-500">
            Preparing your Blog reading
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSuspense;
