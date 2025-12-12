import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Tutorial from "./pages/Tutorial/Tutorial";

import NotFoundPage from "./pages/ErorrPage/NotFoundPage";
import {
  DetailPagePCC,
  DetailPageCosine,
  DetailPageACos,
  DetailPageBC,
} from "./pages/DetailSimilarity";

import DetailPerhitunganMean from "./components/DetailPerhitungan/DetailPerhitunganMean";
import DetailPerhitunganMeanCen from "./components/DetailPerhitungan/DetailPerhitunganMeanCen";
import DetailPerhitunganSimilarity from "./components/DetailPerhitungan/DetailPerhitunganSimilarity";
import DetailPerhitunganPrediksi from "./components/DetailPerhitungan/DetailPerhitunganPrediksi";
import FloatingCalculator from "./components/FloatingCalculator/FloatingCalculator";
import Eksplorasi from "./pages/Exploration/Exploration";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Routes>
            {/* route utama */}
            <Route path="/" element={<Home />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/eksplorasi" element={<Eksplorasi />} />
            <Route path="/pccDetail" element={<DetailPagePCC />} />
            <Route path="/cosineDetail" element={<DetailPageCosine />} />
            <Route path="/acosDetail" element={<DetailPageACos />} />
            <Route path="/bcDetail" element={<DetailPageBC />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* end page */}

            {/* route detai perhitungan new page */}

            <Route
              path="/detail-mean-rating"
              element={<DetailPerhitunganMean />}
            />
            <Route
              path="/detail-mean-centered"
              element={<DetailPerhitunganMeanCen />}
            />
            <Route
              path="/detail-similarity"
              element={<DetailPerhitunganSimilarity />}
            />
            <Route
              path="/detail-prediksi"
              element={<DetailPerhitunganPrediksi />}
            />

            {/* end page */}
          </Routes>
          <FloatingCalculator />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
