import { Routes, Route,  BrowserRouter } from "react-router-dom";
import Example from "../pages/Example";

function PageRoutes() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Example />} />
            </Routes>
        </BrowserRouter>
      </>
  
    );
  }
  
  export default PageRoutes