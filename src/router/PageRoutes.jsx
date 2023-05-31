import { Routes, Route,  BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EventsDashboard from "../pages/EventsDashboard";
import SeatSelection from "../pages/SeatSelection"
import Perfil from "../components/Perfil/perfil";
import LoginPage from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import DashEventos from "../components/Dashboard/Scenes/Evento";
import DashAsientos from "../components/Dashboard/Scenes/Asiento";

function PageRoutes() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CRUDe" element={<EventsDashboard />} />
                <Route path="/asientos" element={<SeatSelection />} /> 
                <Route path="/perfil" element={<Perfil/>} /> 
                <Route path="/login" element={<LoginPage  propsRegistrando={false} />} />
                <Route path="/registro" element={<LoginPage  propsRegistrando={true} />} />
                <Route path="/DashEventos" element={<DashEventos />} />
                <Route path="/DashAsientos" element={<DashAsientos />} />
            </Routes>
        </BrowserRouter>
      </>
  
    );
  }
  
  export default PageRoutes