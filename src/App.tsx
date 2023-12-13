import "./App.css";
import Card, { Status } from "./components/Card";
import DefaultTemplate from "./layout/DefaultTemplate";

function App() {
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
