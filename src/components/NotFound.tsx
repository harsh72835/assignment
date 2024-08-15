import { ArrowLeft } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError() as Record<string, string>;

  return (
    <div className={"flex flex-col items-center justify-center h-full gap-5"}>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Oops!
      </h1>
      <h3 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
        We were unable to process your request due to the following error:{" "}
        <i>{error.statusText || error.message}</i>
      </h3>
      <Link to={"/"} className="text-blue-500 flex gap-2">
        <ArrowLeft />
        back to home
      </Link>
    </div>
  );
};
