import { useEffect } from "react";
import "./App.css";
import Card, { Status } from "./components/Card";
import DefaultTemplate from "./layout/DefaultTemplate";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./queries";

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <DefaultTemplate>
      <h1>Rick And Morty</h1>
      <Card
        image="https://rickandmortyapi.com/api/character/avatar/152.jpeg"
        name="Rick"
        status={Status.alive}
        handleClick={() => console.log("clicked")}
      />
    </DefaultTemplate>
  );
}

export default App;
