import { Routes, Route,  BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EventsDashboard from "../pages/EventsDashboard";
import SeatSelection from "../pages/SeatSelection"
import LoginPage from "../pages/Login";
import RegistroPage from "../pages/Registro";

function PageRoutes() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CRUDe" element={<EventsDashboard />} />
                <Route path="/asientos" element={<SeatSelection />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegistroPage />} />
            </Routes>
        </BrowserRouter>
      </>
  
    );
  }
  
  export default PageRoutes