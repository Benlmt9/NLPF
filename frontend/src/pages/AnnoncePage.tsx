import React from 'react'
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import AnnonceCard from '../components/AnnonceCard';
import { getAnnonces } from "../utils"
import { useCookies } from "react-cookie";
import LockOutlined from '@mui/icons-material/LockOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MenuAppBar from '../components/AppBar';
import { UserContext } from '../contexts/user';

export default function AnnoncePage()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [AnnoncesList, setAnnoncesList] = React.useState([]);
    const [filteredAnnonceList, setFilteredAnnonceList] = React.useState([]);
    const [activeCloseFilter, setActiveCloseFilter] = React.useState(-1);
    const [cityFilter, setCityFilter] = React.useState("");
    const [remoteFilter, setRemoteFilter] = React.useState("TOUT");
    const [search, setSearch] = React.useState("");
    const { user, setUser } = React.useContext(UserContext);

    React.useEffect(() => {
        async function setAnnoncesListFromAPI() {
            const AnnoncesFromApi = await getAnnonces(cookies.auth_token);
            // const data = await AnnoncesFromApi.json();
            // console.log(AnnoncesFromApi);
            setAnnoncesList(AnnoncesFromApi);
            setFilteredAnnonceList(AnnoncesFromApi);
        }
        setAnnoncesListFromAPI()
        // console.log("annonce lisst :",AnnoncesList);
    }, []
    )


    async function handleRemote(event: any) {
        setRemoteFilter(event.target.value as string);
    }

    async function handleCity(event: any) {
        setCityFilter(event.target.value as string);
    }

    async function handleSearch(event: any) {
        setSearch(event.target.value as string);
    }

    async function handleFilter() {
        var tmpAnnonceFiltered = AnnoncesList;
        console.log("filter : ", search, ",", cityFilter, ",", remoteFilter);
        if (search != "") {
            tmpAnnonceFiltered = tmpAnnonceFiltered.filter((elt : any) => elt.title.toLowerCase().includes(search.toLowerCase()));
            console.log("a");
        }
        if (cityFilter != "") {
            tmpAnnonceFiltered = tmpAnnonceFiltered.filter((elt : any) => elt.city.toLowerCase().includes(cityFilter.toLowerCase()));
            console.log("b");
        }
        if (remoteFilter != "TOUT"){
            tmpAnnonceFiltered = tmpAnnonceFiltered.filter((elt : any) => elt.remote === remoteFilter );
            console.log("c");
        }
        setFilteredAnnonceList(tmpAnnonceFiltered);
    }

    function handleCloseFilter(val: any) {
        if (activeCloseFilter !== val) {
            setFilteredAnnonceList(AnnoncesList.filter((elt: any) => elt.closed == val));
            setActiveCloseFilter(val);
        }
        else {
            setFilteredAnnonceList(AnnoncesList);
            setActiveCloseFilter(-1);
        }
    }

    return (
        <>
        <Box sx={{
            width: "800px",
            margin: "auto",
        }}>
            <div>
                <Stack spacing={1}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={2} marginTop={1}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Remote</InputLabel>
                            <Select
                            required
                            labelId="demo-simple-select-label"
                            id="state"
                            name="state"
                            value={remoteFilter}
                            label="Etat"
                            onChange={handleRemote}
                            >
                            <MenuItem value={"TOUT"}>Tout</MenuItem>
                            <MenuItem value={"FULL"}>Full</MenuItem>
                            <MenuItem value={"SEMI"}>Semi</MenuItem>
                            <MenuItem value={"NO"}>No</MenuItem>
                            </Select>
                        </FormControl>
                            </Grid> 
                            <Grid item>
                            <FormControl variant="outlined">
                                <TextField
                                    id="search-mission-bar"
                                    type="search"
                                    onChange={handleCity}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            </InputAdornment>
                                        ),
                                    }}
                                    size="small"
                                    />
                            </FormControl>
                        </Grid>
                            <Grid item>
                            <FormControl variant="outlined">
                                <TextField
                                    id="search-mission-bar"
                                    type="search"
                                    onChange={handleSearch}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            </InputAdornment>
                                        ),
                                    }}
                                    size="small"
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleFilter}>Search</Button>
                        </Grid>
                    </Grid>
                    {filteredAnnonceList.length == 0 ?
                            <Divider>
                                <Typography variant="overline" display="block" style={{ color: "#838383" }}>
                                    Aucune annonce
                                </Typography>
                            </Divider>
                        :
                        <div>
                            <Stack spacing={2}>
                            <Divider />
                                {filteredAnnonceList.map((entry: any) => {
                                    return (
                                        <AnnonceCard title={entry.title} description={entry.description} key={entry._id} ownerId={entry.ownerId} annonceId={entry._id} canApply={user.type == "CANDIDATE"} city={entry.city} remote={entry.remote}/>
                                        )
                                    }
                                    )}
                            </Stack>
                        </div>
                    }
                </Stack>
            </div>
        </Box>
                    </>
    );
}
                                