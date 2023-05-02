import { Routes, Route,  BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EventsDashboard from "../pages/EventsDashboard";

function PageRoutes() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CRUDe" element={<EventsDashboard />} />
                

            </Routes>
        </BrowserRouter>
      </>
  
    );
  }
  
  export default PageRoutes