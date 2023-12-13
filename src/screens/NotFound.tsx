import NotFoundImg from "../assets/images/NotFound.png";
import DefaultTemplate from "../layout/DefaultTemplate";

const NotFound = () => {
  return (
    <DefaultTemplate disableLogo>
      <div className="flex flex-col items-center justify-center h-screen text-white text-center">
        <img src={NotFoundImg} alt="Not Found" className="max-w-full h-auto" />
        <div>
          <h1 className="text-5xl font-bold py-5">Oops!</h1>
          <p className="text-xl">
            We can't find the page you're looking for...
          </p>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default NotFound;
