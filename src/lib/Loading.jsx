function Loading() {
  return (
    <div className="flex items-center justify-center w-full min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div
            className="absolute inset-0 rounded-full border-[3px] border-gray-200"
          ></div>
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-600 animate-spin"
          ></div>
        </div>
        <span className="text-sm font-semibold text-gray-500 tracking-wide">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
