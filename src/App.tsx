import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./screens/Details";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<Details />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
