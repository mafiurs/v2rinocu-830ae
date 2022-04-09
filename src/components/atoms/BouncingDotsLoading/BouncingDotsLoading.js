export default function BouncingDotsLoading() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center mt-48">
        <div style={{ width: 'fit-content' }} className=" space-x-2 p-3 rounded-full">
          <div className="flex items-center justify-center space-x-2">
            <div
              style={{ animationDelay: '0.1s' }}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-full animate-bounce"
            ></div>
            <div
              style={{ animationDelay: '0.2s' }}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-full animate-bounce"
            ></div>
            <div
              style={{ animationDelay: '0.3s' }}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-full animate-bounce"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
