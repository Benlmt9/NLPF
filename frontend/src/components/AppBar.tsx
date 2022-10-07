// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';

// import { UserContext } from '../contexts/user';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { getAvatarUrl } from '../utils';

// import Logo from '../cristal-logo.svg';

// const menuItems = [
//   { name: 'Mes Annonces', route: '/myannonces/', company: true },
//   { name: 'Toutes les Annonces', route: '/annonces/', company: false }
// ];

// const menu = ['Mes Annonces', 'Mes Annonces']
// const settings = ['Logout'];

// const AppBar = (props: any) => {

//   const navigate = useNavigate();
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const { user, setUser } = React.useContext(UserContext);
//   const [cookies, setCookie, removeCookie] = useCookies();

//   const handleOpenNavMenu = (event: any) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: any) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   async function logout(e: any) {
//     removeCookie("auth_token");
//     window.location.reload();
//   }

//   function displayMenuItem(item: any, i:any) {
//     if (item.admin === false || (item.admin === true && props.admin === true)) {
//       return (<Button
//         key={i}
//         onClick={(e) => { handleCloseNavMenu(); navigate(item.route) }}
//         sx={{ my: 2, color: 'white', display: 'block' }}
//       >
//         {item.name}
//       </Button>)
//     }
//   }

//   return (
//     <AppBar position="static" style={{backgroundColor: "#1d2126"}}>
//       <Container style={{ width: "900px", margin: "auto" }}>
//         <Toolbar disableGutters>
//           <Box
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { md: 'flex', xs: 'none' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             <img src={Logo} />
//           </Box>

//           <Box sx={{ flexGrow: 1, display: { md: 'flex', xs: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {menuItems.map((page, i) => (
//                 <MenuItem key={i} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page.name}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {menuItems.map((page, i) => displayMenuItem(page, i))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src={getAvatarUrl(user.avatar)} />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center" onClick={logout}>{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default AppBar;
export{}
