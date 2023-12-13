import DefaultTemplate from "../layout/DefaultTemplate";
import Card, { CardProps } from "../components/Card";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries";
import LoadingGif from "../assets/images/Loading.gif";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      name: searchTerm,
      status: filter === "all" ? "" : filter,
    },
  });
  const navigate = useNavigate();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <DefaultTemplate>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        onFilter={(e) => handleFilterChange(e)}
        filter={filter}
      />

      {loading && (
        <div className="flex justify-center mt-14">
          <img src={LoadingGif} alt="loading-gif" width={200} height={200} />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && data && (
        <>
          {data.characters.info.count > 0 ? (
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
          ) : (
            <span className="flex justify-center mt-16 text-white text-2xl">
              Character not found!
            </span>
          )}
        </>
      )}
    </DefaultTemplate>
  );
};

export default Home;
