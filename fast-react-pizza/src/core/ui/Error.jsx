import { useRouteError } from "react-router-dom";
import LinkAlt from "./LinkAlt";

function NotFound() {
  const error = useRouteError();

  return (
    <div className=" bg-stone-200 p-5 w-full  mx-auto rounded-3xl flex flex-col justify-around items-center h-96">
      <h1 className="text-7xl text-center">Something went wrong </h1>
      <p className="text-yellow-700 text-5xl">
        {error.message || error.data}❗
      </p>
      <LinkAlt to={-1}>&larr; Go back</LinkAlt>
    </div>
  );
}

export default NotFound;
