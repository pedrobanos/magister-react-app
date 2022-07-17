import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import './App.css';
import Matricula from './views/Matricula';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element= { <Home />} />
        <Route path='/matricula' element= {<Matricula />} />
      </Routes>
    </div>
  );
}

export default App;
