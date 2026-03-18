const LoadingChatSuspense = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center space-y-5">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-300 rounded-full animate-spin border-t-purple-600"></div>
          <div
            className="absolute top-2 left-2 w-8 h-8 border-4 border-transparent rounded-full animate-spin border-t-purple-400"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <div className="text-center">
          <h3 className="justify-center items-center text-lg font-semibold text-gray-800 mb-1 dark:text-gray-100">
            Opening your conversations...
          </h3>
          <p className="justify-center items-center text-sm text-gray-500 dark:text-gray-400">
            Your messages are on the way
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingChatSuspense;
