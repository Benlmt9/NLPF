import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AnnoncePage from './pages/AnnoncePage';
import DetailPage from './pages/AnnonceDetails';
import CompanySignUp from './pages/CompanySignUp';
import ChooseYourType from './pages/ChooseYourType';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/signIn' element={<SignIn></SignIn>} />
          <Route path='/' element={<SignIn></SignIn>} />
          <Route path='/type' element={<ChooseYourType></ChooseYourType>} />
          <Route path='/signup' element={<SignUp></SignUp>} />
          <Route path='/companySignup' element={<CompanySignUp></CompanySignUp>} />
          <Route path='/annonces' element={<AnnoncePage></AnnoncePage>} />
          <Route path='/annonces/:annonceId' element={<DetailPage></DetailPage>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
export {};
