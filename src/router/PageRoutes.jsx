import { Routes, Route,  BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

function PageRoutes() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
      </>
  
    );
  }
  
  export default PageRoutes