import { useRouteError } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
export default function ErrorPage() {
  const error = useRouteError();

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-50">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center border">
        <h1 className="text-4xl font-bold text-red-600 mb-4 underline">Oops!</h1>
        <p className="text-lg text-gray-700 mb-6">
          {error.statusText || error.message}
        </p>
        <p className="text-md text-gray-500 mb-6">
          We are sorry, but something went wrong while trying to process your request.
        </p>
        <div className="flex justify-center mt-8">
          {" "}
          <button
            onClick={handleBackToHome}
            className="flex items-center px-6 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-400 transition-all duration-300"
          >
            <ArrowLeftCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
