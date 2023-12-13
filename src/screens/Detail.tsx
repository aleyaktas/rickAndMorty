import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_DETAIL_CHARACTER_BY_ID } from "../queries";
import DefaultTemplate from "../layout/DefaultTemplate";
import backIcon from "../assets/images/Back.svg";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";

interface Episode {
  name: string;
  episode: string;
  air_date: string;
}

interface Location {
  name: string;
}

interface Origin {
  name: string;
}

interface DetailData {
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  episode: Episode[];
  location: Location;
  origin: Origin;
}

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detailData, setDetailData] = useState<DetailData>({
    image: "",
    name: "",
    status: "",
    species: "",
    gender: "",
    episode: [{ name: "", episode: "", air_date: "" }],
    location: { name: "" },
    origin: { name: "" },
  });

  const { loading, error, data } = useQuery(GET_DETAIL_CHARACTER_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.character) {
      setDetailData(data.character);
    }
  }, [data]);

  return (
    <DefaultTemplate>
      {loading && <p className="text-white">Loading...</p>}
      {!loading && data && (
        <>
          <button
            className="flex items-center justify-center gap-2 px-4 py-1 text-primaryText text-sm border border-primaryText rounded-full cursor-pointer mb-20"
            onClick={() => navigate(-1)}
          >
            <img src={backIcon} width={24} height={24} alt="Back" /> Back
          </button>
          <div className="bg-cardBackground rounded-2xl p-16 flex gap-16">
            <div>
              <img
                className="rounded-2xl shadow-cardDetailImage"
                height={350}
                src={detailData.image}
                alt={detailData.name}
              />
            </div>

            <div className="text-white flex flex-col justify-between gap-4">
              <span className="text-primaryText text-4xl">
                {detailData.name}
              </span>

              <div>
                <span className="text-gray-400 text-sm mb-3">Status</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`${
                      detailData.status === "Dead"
                        ? "bg-red"
                        : detailData.status === "Alive"
                        ? "bg-green"
                        : "bg-gray"
                    } rounded-full w-3 h-3`}
                  />
                  <p>{detailData.status}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm mb-3">
                  Species, Gender
                </span>
                <p>{`${detailData.species} - ${detailData.gender}`}</p>
              </div>

              <div>
                <span className="text-gray-400 text-sm mb-3">Episodes</span>
                {detailData?.episode?.map((ep, index) => (
                  <p key={index} style={{ marginBottom: "5px" }}>
                    {`${ep.name} - ${ep.episode} - ${ep.air_date}`}
                  </p>
                ))}
              </div>

              <div>
                <span className="text-gray-400 text-sm mb-3">
                  Last known location
                </span>
                <p>{`${detailData.location?.name}`}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm mb-3">Origin</span>
                <p>{`${detailData.origin?.name}`}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </DefaultTemplate>
  );
};

export default Detail;
