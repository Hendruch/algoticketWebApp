import { Routes, Route,  BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EventsDashboard from "../pages/EventsDashboard";
import SeatSelection from "../pages/SeatSelection"
import Perfil from "../components/Perfil/perfil";
import LoginPage from "../pages/Login";
import RegistroPage from "../pages/Registro";
import DashboardLayout from "../layouts/DashboardLayout";
import DashEventos from "../components/Dashboard/Scenes/Evento";

function PageRoutes() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CRUDe" element={<EventsDashboard />} />
                <Route path="/asientos" element={<SeatSelection />} /> 
                <Route path="/perfil" element={<Perfil/>} /> 
                <Route path="/asientos" element={<SeatSelection />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegistroPage />} />
                <Route path="/DashEventos" element={<DashEventos />} />
            </Routes>
        </BrowserRouter>
      </>
  
    );
  }
  
  export default PageRoutes