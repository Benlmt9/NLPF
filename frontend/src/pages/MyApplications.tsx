import React from 'react'
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import AnnonceCard from '../components/AnnonceCard';
import { getAnnonces, getMyApply } from "../utils"
import { useCookies } from "react-cookie";
import LockOutlined from '@mui/icons-material/LockOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MenuAppBar from '../components/AppBar';
import { UserContext } from '../contexts/user';
import ApplyAnnonceCard from '../components/ApplyAnnonceCard';
export default function MyApplications()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [AnnoncesList, setAnnoncesList] = React.useState([]);
    const [filteredAnnonceList, setFilteredAnnonceList] = React.useState([]);
    const [activeCloseFilter, setActiveCloseFilter] = React.useState(-1);
    const [cityFilter, setCityFilter] = React.useState("");
    const [remoteFilter, setRemoteFilter] = React.useState("TOUT");
    const [search, setSearch] = React.useState("");
    const { user, setUser } = React.useContext(UserContext);
    const [ myApplicationsAnnonces, setMyApplicationsAnnonces ] = React.useState([[]]);
    const [filteredList, setFilteredList] = React.useState([[]]);

    React.useEffect(() => {
        async function setAnnoncesListFromAPI() {
            console.log("c'est çaaaa",myApplicationsAnnonces);
            const AnnoncesFromApi = await getAnnonces(cookies.auth_token);
            const myappli = await getMyApply(cookies.auth_token, user._id);
            console.log("mes applications", myappli);
            console.log("mes applications", myappli[0][0].title);
            // const data = await AnnoncesFromApi.json();
            // console.log(AnnoncesFromApi);
            setAnnoncesList(AnnoncesFromApi);
            setFilteredAnnonceList(AnnoncesFromApi);
            setMyApplicationsAnnonces(myappli);
            setFilteredList(myappli);
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
        var tmpAnnonceFiltered = myApplicationsAnnonces;
        console.log("filter : ", search, ",", cityFilter, ",", remoteFilter);
        if (search != "") {
            tmpAnnonceFiltered = tmpAnnonceFiltered.filter((elt : any) => elt[0].title.toLowerCase().includes(search.toLowerCase()));
            console.log("a");
        }
        if (cityFilter != "") {
            tmpAnnonceFiltered = tmpAnnonceFiltered.filter((elt : any) => elt[0].city.toLowerCase().includes(cityFilter.toLowerCase()));
            console.log("b");
        }
        if (remoteFilter != "TOUT"){
            tmpAnnonceFiltered = tmpAnnonceFiltered.filter((elt : any) => elt[0].remote === remoteFilter );
            console.log("c");
        }
        setFilteredList(tmpAnnonceFiltered);
    }

    function isInClosed(applId:any, ClosedList:any){
        if (ClosedList.filter((elt: any) => elt == applId).length > 0){
            console.log("is in",applId);
            return true;
        }
        console.log("isn't in",applId);
        console.log(ClosedList)
        return false;
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
                    {(filteredList.length == 0 || (filteredList.length == 1 && filteredList[0].length == 0)) ?
                            <Divider>
                                <Typography variant="overline" display="block" style={{ color: "#838383" }}>
                                    Vous n'avez pas encore postuler
                                </Typography>
                            </Divider>
                        :
                        <div>
                            <Stack spacing={2}>
                            <Divider />
                                {filteredList.map((entry: any) => {console.log("entry ====", entry)
                                    return (<>
                                        <ApplyAnnonceCard title={entry[0].title} description={entry[0].description} key={entry[0]._id} ownerId={entry[0].ownerId} annonceId={entry[0]._id} canApply={false} city={entry[0].city} remote={entry[0].remote} message={entry[1].message} score={entry[1].score} isAccepted={(entry[0].choosenCandidate == undefined)? false :entry[0].choosenCandidate === user._id} isRefused={isInClosed(entry[1].applicationId, entry[0].rejectedApplications)}/>
                                        </>)
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
                                