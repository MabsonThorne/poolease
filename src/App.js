import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Frame from "./pages/Frame";
import OtrasConsultas from "./pages/OtrasConsultas";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/1":
        title = "Frame";
        metaDescription = "Description for Frame.";
        break;
      case "/2":
        title = "Otras Consultas";
        metaDescription = "Description for Otras Consultas.";
        break;
      default:
        title = "Page Not Found";
        metaDescription = "The page you are looking for does not exist.";
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/1" element={<Frame />} />
      <Route path="/2" element={<OtrasConsultas />} />
    </Routes>
  );
}

export default App;
