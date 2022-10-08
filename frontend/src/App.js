import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AnnoncePage from './pages/AnnoncePage';
import DetailPage from './pages/AnnonceDetails';
import CompanySignUp from './pages/CompanySignUp';
import ChooseYourType from './pages/ChooseYourType';
import CompanyAnnonce from './pages/CompanyAnnonce';
import CompanyAnnonceDetails from './pages/CompanyAnnonceDetails';
import { useCookies } from "react-cookie";
import { getUserDataWithToken } from './utils';
import { UserContext } from './contexts/user';
import { AppBar } from '@mui/material';
import MenuAppBar from './components/AppBar';


const tmpuser = {
  // Thibault id
  //id: "633cca004f78b0015281f6e5",

  // Apple 2 Id
  id: "63402f3d523f30c37800e55b",
  email: "fd",
  name: "piiipi",
  type: "COMPANY",
  avatar: 0,
};

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = React.useState(tmpuser);
  const valueUser = { user, setUser };

  React.useEffect(() => {
    async function setUserContextFromAPI() {
        const userFromAPI = await getUserDataWithToken(cookies.auth_token);
        console.log("fromAPI", userFromAPI);
        if (userFromAPI.statusCode == 400)
        {
          setUser(tmpuser);
        }
        else{
          console.log("ici",user);
          setUser(userFromAPI);
        }
    }
    setUserContextFromAPI();
    console.log("UwU",user);
}, []
)
  getUserDataWithToken(cookies.auth_token);
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
      <Router>
      {/* <MenuAppBar></MenuAppBar> */}
        <Routes>
          <Route path='/signIn' element={<SignIn></SignIn>} />
          <Route path='/' element={<SignIn></SignIn>} />
          <Route path='/type' element={<ChooseYourType></ChooseYourType>} />
          <Route path='/signup' element={<SignUp></SignUp>} />
          <Route path='/companySignup' element={<CompanySignUp></CompanySignUp>} />
          <Route path='/annonces' element={<AnnoncePage></AnnoncePage>} />
          <Route path='/myannonces' element={<CompanyAnnonce></CompanyAnnonce>} />
          <Route path='/myannonces/:myAnnonceId' element={<CompanyAnnonceDetails></CompanyAnnonceDetails>} />
          <Route path='/annonces/:annonceId' element={<DetailPage></DetailPage>} />
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
export {};
