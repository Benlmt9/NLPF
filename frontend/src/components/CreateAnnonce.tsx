import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { postAnnonce } from '../utils';
import { useCookies } from "react-cookie";
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { UserContext } from '../contexts/user';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarPicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import CustomizeDayPicker from './testCal';
import LocalizedDatePicker from './testcal2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';

const locales = ['en', 'fr', 'de', 'ru', 'ar-sa'] as const;

function CreateAnnonce(){
  const [locale, setLocale] = React.useState<typeof locales[number]>('fr');
  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs('2022-10-07'),
  );
    const [isError, setIsError] = React.useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [state, setState] = React.useState("");
    const [remote, setRemote] = React.useState("");
    const { user, setUser } = React.useContext(UserContext);
    const [startDate, setStartDate] = React.useState(new Date());
    const stateSeclectHandleChange = (event: SelectChangeEvent) => {
        setState(event.target.value as string);
      };

    const remoteSeclectHandleChange = (event: SelectChangeEvent) => {
        setRemote(event.target.value as string);
      };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("title") != undefined && data.get("state") != undefined &&  data.get("description") != undefined){
          setIsError(false)
          await postAnnonce(cookies.auth_token, {
            title: data.get('title'),
            description: data.get('description'),
            state: data.get('state'),
            // ownerId: user.id,
            city: data.get('city'),
            remote: data.get('remote'),
            date: datePickerValue,
          });
        }
        else{setIsError(true)}
        window.location.reload()
        
      };
      console.log("dqsfhshdishdilsdh",user);
return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Titre de l'annonce"
                  name="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="Ville"
                  name="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    id="outlined-multiline-static"
                    label="Description"
                    name="description"
                    multiline
                    rows={10}
                    fullWidth
                />
                </Grid> 
                <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">état de l'annonce</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="state"
                name="state"
                value={state}
                label="Etat"
                onChange={stateSeclectHandleChange}
                >
                <MenuItem value={"OPEN"}>Ouvert</MenuItem>
                <MenuItem value={"HIDDEN"}>Caché</MenuItem>
                {/* <MenuItem value={"CLOSED"}>Fermé</MenuItem> */}
                </Select>
              </FormControl>
                </Grid>
                <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Remote</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="remote"
                name="remote"
                value={remote}
                label="Remote"
                onChange={remoteSeclectHandleChange}
                >
                <MenuItem value={"FULL"}>Oui</MenuItem>
                <MenuItem value={"SEMI"}>Semie</MenuItem>
                <MenuItem value={"NO"}>Non</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
              <Stack spacing={3}>
                <DatePicker
                  value={datePickerValue}
                  onChange={(newValue) => setDatePickerValue(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Créer l'annonce
            </Button>
          </Box>
)
}
export default CreateAnnonce