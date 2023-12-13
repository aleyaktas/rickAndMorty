import DefaultTemplate from "../layout/DefaultTemplate";
import Card, { CardProps } from "../components/Card";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries";
import LoadingGif from "../assets/images/Loading.gif";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ReactPaginate from "react-paginate";

const Home = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      name: searchTerm,
      pageNumber: pageNumber,
      status: filter === "all" ? "" : filter,
    },
  });

  useEffect(() => {
    if (data && data.characters && data.characters.info) {
      setPageCount(Math.ceil(data.characters.info.count / 20 + 1));
    }
  }, [data]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageNumber(0);
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
          {data.characters.info.count > 20 && (
            <ReactPaginate
              containerClassName="pagination"
              forcePage={pageNumber}
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={(e) => setPageNumber(e.selected)}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< Prev"
              renderOnZeroPageCount={null}
            />
          )}
        </>
      )}
    </DefaultTemplate>
  );
};

export default Home;
