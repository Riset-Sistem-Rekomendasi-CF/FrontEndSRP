import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Tutorial from './pages/Tutorial/Tutorial';

import NotFoundPage from "./pages/ErorrPage/NotFoundPage";
import DetailPagePCC from './pages/detailPageView/DetailPagePCC';
import DetailPageCosine from './pages/detailPageView/DetailPageCosine';
import DetailPageACos from './pages/detailPageView/DetailPageACos';
import DetailPageBC from './pages/detailPageView/DetailPageBC';
import Eksplorasi from './pages/Eksplorasi/Eksplorasi';
import DetailPerhitunganMean from './components/DetailPerhitungan/DetailPerhitunganMean';
import DetailPerhitunganMeanCen from './components/DetailPerhitungan/DetailPerhitunganMeanCen';
import DetailPerhitunganSimilarity from './components/DetailPerhitungan/DetailPerhitunganSimilarity';
import DetailPerhitunganPrediksi from './components/DetailPerhitungan/DetailPerhitunganPrediksi';


function App() {
  return (
    <Router>
      <>
      <Routes>

            {/* route utama */}
            <Route path="/" element={<Home />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/eksplorasi" element={<Eksplorasi />} />
            <Route path="/pccDetail" element={<DetailPagePCC />} />
            <Route path="/cosineDetail" element={<DetailPageCosine />} />
            <Route path="/acosDetail" element={<DetailPageACos />} />
            <Route path="/bcDetail" element={<DetailPageBC />} />
            <Route path="*" element={<NotFoundPage/>}/>
            {/* end page */}



            {/* route detai perhitungan new page */}

            <Route path = "/detail-mean-rating" element={<DetailPerhitunganMean />} />
            <Route path="/detail-mean-centered" element={<DetailPerhitunganMeanCen />} />
            <Route path="/detail-similarity" element={<DetailPerhitunganSimilarity />} />
            <Route path="/detail-prediksi" element={<DetailPerhitunganPrediksi />} />
           
            {/* end page */}
          </Routes>
      </>
    </Router>
  );
}

export default App;
