import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-page" className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
        <p className="my-5">Sorry, an unexpected error has occurred.</p>
        <p className="font-bold text-red-500 text-lg">
          <i>
            {error?.status}, {error.error?.message}
          </i>
        </p>

        <Link className="block text-primary-500 hover:underline mt-10" to="/">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
