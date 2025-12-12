import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShipContextProvider } from "./contexts/ShipContext";
import Home from "./components/Home";
import Hiring from "./components/Hiring";
import QuestRoom from "./components/QuestRoom";
import { Layout } from "./layouts/Layout";

function App() {
  return (
    <>
      <ShipContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="Home" element={<Home />}></Route>
              <Route path="Hiring" element={<Hiring />}></Route>
              <Route path="QuestRoom" element={<QuestRoom />}></Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ShipContextProvider>
    </>
  );
}

export default App;
