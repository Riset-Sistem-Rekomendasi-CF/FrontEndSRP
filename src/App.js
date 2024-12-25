import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Tutorial from './pages/Tutorial/Tutorial';
import Latihan from './pages/Latihan/Latihan';
import NotFoundPage from "./pages/ErorrPage/NotFoundPage";
import DetailPagePCC from './pages/detailPageView/DetailPagePCC';
import DetailPageCosine from './pages/detailPageView/DetailPageCosine';
import DetailPageACos from './pages/detailPageView/DetailPageACos';
import DetailPageBC from './pages/detailPageView/DetailPageBC';


function App() {
  return (
    <Router>
      <>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/latihan" element={<Latihan />} />
            <Route path="/pccDetail" element={<DetailPagePCC />} />
            <Route path="/cosineDetail" element={<DetailPageCosine />} />
            <Route path="/acosDetail" element={<DetailPageACos />} />
            <Route path="/bcDetail" element={<DetailPageBC />} />
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
      </>
    </Router>
  );
}

export default App;
