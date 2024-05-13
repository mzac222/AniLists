
import './App.css';
import Popular from './Components/Popular';
import { Routes ,Route} from 'react-router-dom';
import Gallery from './Components/Gallery';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AnimeItem from './Components/AnimeItem';
import HomePage from './Components/HomePage';
import Upcoming from './Components/Upcoming';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery/>} />
    


    </Routes>
 
    </BrowserRouter>
  );
}

export default App;
