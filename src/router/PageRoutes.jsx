import { Routes, Route,  BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EventsDashboard from "../pages/EventsDashboard";
import SeatSelection from "../pages/SeatSelection"

function PageRoutes() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CRUDe" element={<EventsDashboard />} />
                <Route path="/asientos" element={<SeatSelection />} /> 
            </Routes>
        </BrowserRouter>
      </>
  
    );
  }
  
  export default PageRoutes