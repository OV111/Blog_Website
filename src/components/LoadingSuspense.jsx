const LoadingSuspense = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-300 rounded-full animate-spin border-t-purple-600"></div>
          <div
            className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin border-t-purple-400"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Loading your journey...
          </h3>
          <p className="text-sm text-gray-500">
            Preparing your travel experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSuspense;
