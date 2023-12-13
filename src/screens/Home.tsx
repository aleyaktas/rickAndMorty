import DefaultTemplate from "../layout/DefaultTemplate";
import Card, { CardProps } from "../components/Card";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries";
import LoadingGif from "../assets/images/Loading.gif";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const navigate = useNavigate();

  return (
    <DefaultTemplate>
      {loading && (
        <div className="flex justify-center mt-14">
          <img src={LoadingGif} alt="loading-gif" width={200} height={200} />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && data && (
        <>
          <div className=" grid gap-14 p-10 grid-cols-card">
            {data.characters.results.map((card: CardProps) => (
              <Card
                id={card.id}
                image={card.image}
                name={card.name}
                status={card.status}
                handleClick={() => navigate(`/${card.id}`)}
              />
            ))}
          </div>
        </>
      )}
    </DefaultTemplate>
  );
};

export default Home;
