import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from "../SignUp.png";
import candidat from "../candidat.png";
import company from "../company.png";
import { postSignUp } from '../utils';
import { useCookies } from "react-cookie";
import { ButtonBase, Card, CardMedia } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

import MenuAppBar from '../components/AppBar';

const useStyles = makeStyles({
    custom: {
      color: "#0C387F",
      fontWeight: "bold"
    }
  });

const theme = createTheme();

export default function ChooseYourType() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isError, setIsError] = React.useState(false);
  
  const classes = useStyles();
  var cardStyle = {
    display: 'block',
    width: '16vw',
    transitionDuration: '0.3s',
    height: '20vw'
}

  return (
                <Box sx={{ width: '100%' }}>
                      <MenuAppBar/>
      <Grid container justifyContent="space-around">
        <div>
        <Grid item xs={6} justifyContent="center">
        <Card variant="outlined" style={cardStyle}>
                <ButtonBase
                onClick={event => { navigate("/signup")}}
                >
                    <CardMedia
                    component="img"
                    height= '200'
                    width= '100'
                    image={candidat}
                    alt="Candidat"
                    
                    />
                </ButtonBase>
                <Typography variant="h6" className={classes.custom}>
                Êtes vous un candidat ?
                </Typography>
                </Card>
        </Grid>
        </div>
        <div>
        <Grid item xs={6} justifyContent="center">
        <Card variant="outlined" style={cardStyle}>
                <Box
                    justifyContent="center"
                    alignItems="center"
                    >
                <ButtonBase
                onClick={event => { navigate("/companySignup") }}
                >
                    
                    <CardMedia
                    component="img"
                    height= '200'
                    width= '100'
                    image={company}
                    alt="Entreprise"
                    />
                </ButtonBase>
                <Typography variant="h6" className={classes.custom}>
                Êtes vous une Entreprise ?
                </Typography>
                </Box>
                </Card>
        </Grid>
        </div>
      </Grid>
    </Box>
        
  );
}
