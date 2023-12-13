import { CardProps } from "../types/Card.interfaces";

const Card = ({ image, name, status, handleClick }: CardProps) => {
  const statusColorClass =
    status === "Dead" ? "bg-red" : status === "Alive" ? "bg-green" : "bg-gray";

  return (
    <div
      className="flex flex-col h-80 w-56 lg:w-64 rounded-3xl text-white overflow-hidden shadow-card cursor-pointer hover:animate-wiggle"
      onClick={handleClick}
    >
      <div className="h-64 flex justify-center items-center p-5 bg-cardBackground">
        <img
          className="w-28 h-28 lg:w-36 lg:h-36 rounded-full shadow-cardImage border-4 border-solid border-cardImageBorder"
          src={`${image}`}
          alt={name}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 h-32 p-5 text-center bg-cardInfo">
        <h3 className=" whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-lg text-white">
          {name}
        </h3>
        <span
          className={`inline-block rounded-lg text-base text-white px-2 py-1 ${statusColorClass}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default Card;
