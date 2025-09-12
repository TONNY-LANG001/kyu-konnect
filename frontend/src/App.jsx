import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Landmark1 from "./screens/Landmark1";
import Landmark2 from "./screens/Landmark2";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landmark1" element={<Landmark1 />} /> 
        <Route path="/landmark2" element={<Landmark2 />} />
       {/* Add more screens/routes as you define them */}
      </Routes>
    </Router>
  );
}
