import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header/Header";
import { Home } from "./components/Home";
import { Hiring } from "./components/Hiring";
import { QuestRoom } from "./components/QuestRoom";
import { ShipContextProvider } from "./contexts/ShipContext";

function App() {
  return (
    <>
      <ShipContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="Home" element={<Home />}></Route>
            <Route path="Hiring" element={<Hiring />}></Route>
            <Route path="QuestRoom" element={<QuestRoom />}></Route>
          </Routes>
        </BrowserRouter>
      </ShipContextProvider>
    </>
  );
}

export default App;
