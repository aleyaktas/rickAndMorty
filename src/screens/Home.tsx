import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries";
import LoadingGif from "../assets/images/Loading.gif";
import SearchBar from "../components/SearchBar";
import DefaultTemplate from "../layout/DefaultTemplate";
import {
  PAGE_RANGE_DISPLAYED,
  PER_PAGE_COUNT,
} from "../assets/constants/pagination";
import { CardProps, IStatus } from "../types/Card.interfaces";
import Card from "../components/Card";

const Home = () => {
  const navigate: NavigateFunction = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<IStatus>(IStatus.all);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      name: searchTerm,
      pageNumber: pageNumber,
      status: filter === IStatus.all ? "" : filter,
    },
  });

  useEffect(() => {
    if (data && data.characters && data.characters.info) {
      setPageCount(Math.ceil(data.characters.info.count / PER_PAGE_COUNT + 1));
    }
  }, [data]);

  const handleFilterChange = (e: IStatus) => {
    setPageNumber(0);
    setFilter(e);
  };

  return (
    <DefaultTemplate>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
          setPageNumber(0);
        }}
        onFilter={(e: IStatus) => handleFilterChange(e)}
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
            <div className="grid grid-cols-card gap-12 lg:gap-20 justify-items-center p-10">
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
          {data.characters.info.count > PER_PAGE_COUNT && (
            <ReactPaginate
              containerClassName="pagination"
              forcePage={pageNumber - 1}
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={(e) => setPageNumber(e.selected + 1)}
              pageCount={pageCount - 1}
              pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
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
