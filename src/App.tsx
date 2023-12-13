import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Detail from "./screens/Detail";
import Home from "./screens/Home";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
