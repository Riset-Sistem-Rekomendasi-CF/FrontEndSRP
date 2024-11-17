import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Tutorial from './pages/Tutorial/Tutorial';
import Practice from './pages/Practice/Practice';
import NotFoundPage from "./pages/ErorrPage/NotFoundPage";


function App() {
  return (
    <Router>
      <div className="bg-yellow-primary text-black-900 min-h-screen">

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
