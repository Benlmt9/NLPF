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
import background from '../travaux_en_cours_visuel.png'
import { postConnect } from '../utils';
import { Cookies } from 'react-cookie';
import { useCookies } from "react-cookie";
import { UserContext } from '../contexts/user';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function MyQuizz() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <img
        src={background} width={950} height={525}
      /></Box>
      </Container>
    </ThemeProvider>
  );
}