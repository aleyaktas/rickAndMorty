import { NavigateFunction, useNavigate } from "react-router-dom";
import DefaultTemplate from "../layout/DefaultTemplate";
import NotFoundImg from "../assets/images/NotFound.png";

const NotFound = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <DefaultTemplate disableLogo>
      <div className="flex flex-col items-center justify-center h-screen text-white text-center">
        <img src={NotFoundImg} alt="Not Found" className="max-w-full h-auto" />
        <div>
          <h1 className="text-5xl font-bold py-5">Oops!</h1>
          <p className="text-xl">
            We can't find the page you're looking for...
          </p>
          <button
            className="mx-auto gap-2 px-4 py-2 text-primaryText border-primaryText hover:animate-wiggle font-bold text-sm border  rounded-full cursor-pointer my-5"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default NotFound;
