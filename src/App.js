import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Tutorial from './pages/Tutorial/Tutorial';

import NotFoundPage from "./pages/ErorrPage/NotFoundPage";
import DetailPagePCC from './pages/detailPageView/DetailPagePCC';
import DetailPageCosine from './pages/detailPageView/DetailPageCosine';
import DetailPageACos from './pages/detailPageView/DetailPageACos';
import DetailPageBC from './pages/detailPageView/DetailPageBC';
import Exploration from './pages/Exploration/Exploration';


function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/eksplorasi" element={<Exploration />} />
          <Route path="/detail/pcc" element={<DetailPagePCC />} />
          <Route path="/detail/cosine" element={<DetailPageCosine />} />
          <Route path="/detail/acosine" element={<DetailPageACos />} />
          <Route path="/detail/bc" element={<DetailPageBC />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
