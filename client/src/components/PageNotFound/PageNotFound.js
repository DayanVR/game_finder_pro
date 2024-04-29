import { useNavigate } from "react-router-dom";

export default function Example() {

    const navigate = useNavigate();
 

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="grid min-h-full mx-6 md:mx-16 xl:mx-24 bg-gray-700/[.5] h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center ">
        <p className="text-base font-semibold text-red-400 ">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-600 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-red-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleClick}
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
