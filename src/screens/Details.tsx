import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DETAIL_CHARACTER_BY_ID } from "../queries";
import DefaultTemplate from "../layout/DefaultTemplate";
import backIcon from "../assets/icons/Back.svg";
import LoadingGif from "../assets/images/Loading.gif";
import { IStatus } from "../types/Card.interfaces";
import { IDetailsData } from "../types/Details.interfaces";

const Details = () => {
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();

  const [detailData, setDetailData] = useState<IDetailsData>({
    image: "",
    name: "",
    status: IStatus.unknown,
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
    if (id && Number.isNaN(parseInt(id))) {
      navigate("/not-found", { replace: true });
    }
    if (!loading && (error || !data?.character)) {
      navigate("/not-found", { replace: true });
    }
  }, [loading, error, data, navigate]);

  useEffect(() => {
    if (data && data.character) {
      setDetailData(data.character);
    }
  }, [data]);

  return (
    <DefaultTemplate>
      {loading && (
        <div className="flex justify-center mt-14">
          <img src={LoadingGif} alt="loading-gif" width={200} height={200} />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && data && (
        <>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 hover:animate-wiggle text-primaryText text-sm border border-primaryText rounded-full cursor-pointer my-4"
            onClick={() => navigate(-1)}
          >
            <img src={backIcon} width={24} height={24} alt="Back" /> Back
          </button>
          <div className="bg-cardBackground rounded-2xl p-8 md:p-16 flex flex-col md:flex-row gap-16">
            <div>
              <img
                className="rounded-2xl shadow-cardDetailImage w-full"
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
                      detailData.status === IStatus.dead
                        ? "bg-red"
                        : detailData.status === IStatus.alive
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

export default Details;
