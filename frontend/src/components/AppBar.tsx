import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { positions } from '@mui/system';

import { UserContext } from '../contexts/user';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { makeStyles } from "@mui/styles";

import Logo from '../crossthestreet.png';
import Blg from "../benjamin.le-guen.png"
import headerBackground from "../banner_image.jpg"

const useStyles = makeStyles((theme: any) => ({
  header: {
    backgroundImage: `url(${headerBackground})`,
  },
  custom: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
}));


const menuItems = [
  { name: 'Annonces', route: '/annonces/', admin: false },
  { name: 'Mes Candidatures', route: '/', admin: false },
  { name: 'Mes offres', route: '/', admin: true },
  { name: 'Mes Quizz', route: '/', admin: true },
];

const menu = ['Mes Missions', 'Mes Missions']
const settings = ['Logout'];

const MenuAppBar = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies();


  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function logout(e: any) {
    removeCookie("auth_token");
    window.location.reload();
  }

  function displayMenuItem(item: any, i: any) {
    if (item.admin === false || (item.admin === true && user.type === "COMPANY")) {
      return (<Button
        key={i}
        onClick={(e: any) => { handleCloseNavMenu(); navigate(item.route) }}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        {item.name}
      </Button>)
    }
  }

  return (
    <div>
         <div>
          <AppBar position="static" className={classes.header} sx={{ height: '400px' }}>
    <AppBar position="static" style={{backgroundColor: "#1d2126"}}>
    <div>
        <Toolbar disableGutters>
          <Box
            component="a"
            href="/"
            sx={{
              my: 0, 
              display: { md: 'flex', xs: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <img src={Logo} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { md: 'flex', xs: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuItems.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((page, i) => displayMenuItem(page, i))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={Blg} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logout}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        </div>
    </AppBar>
    <Toolbar></Toolbar>
    <Toolbar sx={{ justifyContent: "center"  }}>
      <Typography variant="h3" className={classes.custom}>
        FIND HELP
      </Typography>
    </Toolbar>
    <Toolbar sx={{ justifyContent: "center"  }}>
    <Typography variant="h6" className={classes.custom}>
        Hope is real. Help is real. Your story is important.
      </Typography>
    </Toolbar>
    </AppBar>
    </div>
    </div>
  );
};
export default MenuAppBar;