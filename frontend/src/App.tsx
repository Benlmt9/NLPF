import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AnnoncePage from './pages/AnnoncePage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SignIn></SignIn>} />
          <Route path='/signup' element={<SignUp></SignUp>} />
          <Route path='/annonces' element={<AnnoncePage></AnnoncePage>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
