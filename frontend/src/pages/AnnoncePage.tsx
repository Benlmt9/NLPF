import React from 'react'
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import AnnonceCard from '../components/AnnonceCard';
import { getAnnonces } from "../utils"
import { useCookies } from "react-cookie";
import LockOutlined from '@mui/icons-material/LockOutlined';

export default function AnnoncePage()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [AnnoncesList, setAnnoncesList] = React.useState([]);
    const [filteredAnnonceList, setFilteredAnnonceList] = React.useState([]);
    const [activeCloseFilter, setActiveCloseFilter] = React.useState(-1);

    
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


    function handleSearch(event: any) {

        setActiveCloseFilter(-1);

        if (event.currentTarget.value === "") {
            setFilteredAnnonceList(AnnoncesList);
        }
        else {
            setFilteredAnnonceList(AnnoncesList.filter((elt : any) => elt.title.toLowerCase().includes(event.currentTarget.value.toLowerCase())))
        }
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
        <Box sx={{
            width: "800px",
            margin: "auto",
        }}>
            <div>
                <Stack spacing={1}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <h1>Toutes les annonces</h1>
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
                                {filteredAnnonceList.map((entry: any) => {console.log("annonce:" , entry)
                                    return (
                                        <AnnonceCard title={entry.title} description={entry.description} key={entry._id} ownerId={entry.ownerId} annonceId={entry._id} canApply={true}/>
                                    )
                                }
                                )}
                            </Stack>
                        </div>
                    }
                </Stack>
            </div>
        </Box>
    );
}