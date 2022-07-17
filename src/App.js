import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import './App.css';
import Matricula from './views/Matricula';
import Register from './views/Register';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element= { <Home />} />
        <Route path='/matricula' element= {<Matricula />} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
