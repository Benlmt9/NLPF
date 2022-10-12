import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Profil from './pages/Profil';
import MyApplications from './pages/MyApplications';
import MyQuizz from './pages/MyQuizz';
import WrongWay from './pages/WrongWay';

function ContextRoutes() {
  // const [cookies, setCookie, removeCookie] = useCookies();
  const { user, setUser } = React.useContext(UserContext);
  console.log("test user context", user);
  // const valueUser = { user, setUser };

//   React.useEffect(() => {
//     async function setUserContextFromAPI() {
//         const userFromAPI = await getUserDataWithToken(cookies.auth_token);
//         console.log("fromAPI", userFromAPI);
//         if (userFromAPI.statusCode == 400)
//         {
//           setUser(tmpuser);
//         }
//         else{
//           console.log("ici",userFromAPI);
//           setUser(userFromAPI);
//         }
//     }
//     // setUserContextFromAPI();
//     console.log("UwU",user);
// }, []
// )
  // getUserDataWithToken(cookies.auth_token);
  if (user._id === undefined)
  return(
    <div>
    <Router>
    <MenuAppBar></MenuAppBar>
    <Routes>
    <Route path='/' element={<SignIn></SignIn>} />
    <Route path='/signIn' element={<SignIn></SignIn>} />
    <Route path='/signup' element={<SignUp></SignUp>} />
    <Route path='/companySignup' element={<CompanySignUp></CompanySignUp>} />
    <Route path='/type' element={<ChooseYourType></ChooseYourType>} />
    <Route path="/*"element={<></>}/>
    </Routes>
    </Router>
    </div>
  )
  if (user.type === "COMPANY")
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
      <Router>
      <MenuAppBar></MenuAppBar>
      {/* <MenuAppBar></MenuAppBar> */}
        <Routes>
          <Route path='/signIn' element={<SignIn></SignIn>} />
          <Route path='/' element={<AnnoncePage></AnnoncePage>} />
          <Route path='/type' element={<ChooseYourType></ChooseYourType>} />
          <Route path='/signup' element={<SignUp></SignUp>} />
          <Route path='/companySignup' element={<CompanySignUp></CompanySignUp>} />
          <Route path='/annonces' element={<AnnoncePage></AnnoncePage>} />
          <Route path='/myannonces' element={<CompanyAnnonce></CompanyAnnonce>} />
          <Route path='/myannonces/:myAnnonceId' element={<CompanyAnnonceDetails></CompanyAnnonceDetails>} />
          <Route path='/annonces/:annonceId' element={<DetailPage></DetailPage>} />
          <Route path='/apply' element={<MyApplications></MyApplications>} />
          <Route path='/profil' element={<Profil></Profil>} />
          <Route path='/myquizz' element={<MyQuizz></MyQuizz>} />
          <Route path="/*"element={<WrongWay></WrongWay>}/>
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  );
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
      <Router>
      <MenuAppBar></MenuAppBar>
      {/* <MenuAppBar></MenuAppBar> */}
        <Routes>
          <Route path='/signIn' element={<SignIn></SignIn>} />
          <Route path='/' element={<AnnoncePage></AnnoncePage>} />
          <Route path='/type' element={<ChooseYourType></ChooseYourType>} />
          <Route path='/signup' element={<SignUp></SignUp>} />
          <Route path='/companySignup' element={<CompanySignUp></CompanySignUp>} />
          <Route path='/annonces' element={<AnnoncePage></AnnoncePage>} />
          <Route path='/annonces/:annonceId' element={<DetailPage></DetailPage>} />
          <Route path='/apply' element={<MyApplications></MyApplications>} />
          <Route path='/profil' element={<Profil></Profil>} />
          <Route path="/*"element={<WrongWay></WrongWay>}/>
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>
  )
};
export default ContextRoutes;