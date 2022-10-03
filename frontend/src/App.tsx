import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SignIn></SignIn>} />
          <Route path='/signup' element={<SignUp></SignUp>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
