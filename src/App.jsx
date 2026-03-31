import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CropRecommendation from "./pages/crop";
import PlantDisease from "./pages/disease";
import Fertilizer from "./pages/fertilizer";
import NutrientDeficiencyPage from "./pages/nutrient";
import SettingsPage from "./pages/setting";
import Chatbot from "./pages/chatbot";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crop" element={<CropRecommendation />} />
        <Route path="/disease" element={<PlantDisease/>} />
        <Route path="/fertilizer" element={<Fertilizer/>} />
        <Route path="/nutrient" element={<NutrientDeficiencyPage/>} />
        <Route path="/setting" element={<SettingsPage/>} />
        <Route path="/chatbot" element={<Chatbot/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;