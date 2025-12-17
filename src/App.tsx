import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShipContextProvider } from "./contexts/ShipContext";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/Home/Home";
import { Hiring } from "./pages/Hiring/Hiring";
import QuestRoom from "./pages/QuestRoom/QuestRoom";
import { CrewDetail } from "./pages/CrewDetail/CrewDetail";

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
              <Route path="/crew/:id" element={<CrewDetail />}></Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ShipContextProvider>
    </>
  );
}

export default App;
