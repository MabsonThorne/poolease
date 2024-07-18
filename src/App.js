import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Frame from "./pages/Frame";
import OtrasConsultas from "./pages/OtrasConsultas";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (pathname === '/') {
      navigate('/1');
    }
  }, [pathname, navigate]);

  return (
    <Routes>
      <Route path="/1" element={<Frame />} />
      <Route path="/2" element={<OtrasConsultas />} />
      <Route path="*" element={<Frame />} /> {/* 默认路由 */}
    </Routes>
  );
}

export default App;
