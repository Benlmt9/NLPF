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

const theme = createTheme();

export default function ChooseYourType() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isError, setIsError] = React.useState(false);

  return (
        <div>
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
                <Button>
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                        Je suis un candidat
                        <img src={candidat}  height={400} onClick={(e) => console.log("e")}/>
                    </Grid >
                </Button>
                <Button>
                    <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                        Je suis une entreprise
                        <img src={company}  height={400} onClick={(e) => console.log("e")}/>
                    </Grid>
                </Button>
            </Grid>
        </div>
  );
}
