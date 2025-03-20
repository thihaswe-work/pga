const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Simple spinning circle */}
      <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
