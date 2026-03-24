import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CropRecommendation from "./pages/crop";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<CropRecommendation />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;