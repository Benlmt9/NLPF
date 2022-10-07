import React from 'react'
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import AnnonceCard from '../components/AnnonceCard';
import { getAnnonces, getAnnoncesOfCompany, getAnnonceWithId } from "../utils"
import { useCookies } from "react-cookie";
import LockOutlined from '@mui/icons-material/LockOutlined';
import CompanyAnnonceCard from '../components/CompanyAnnonceCard';
import { useParams } from "react-router-dom";
import CompanyApplyCard from '../components/ApplyCard';

export default function CompanyAnnonceDetails()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [ApplyList, setApplyList] = React.useState([]);
    const [filteredApllyList, setFilteredApplyList
    ] = React.useState([]);
    const [activeCloseFilter, setActiveCloseFilter] = React.useState(-1);
    const { myAnnonceId } = useParams();

    React.useEffect(() => {
        async function setApplyListFromAPI() {
            const AnnonceFromApi = await getAnnonceWithId(cookies.auth_token, myAnnonceId);
            console.log(AnnonceFromApi);
            setApplyList((AnnonceFromApi.applications == undefined)?[]:AnnonceFromApi.applications);
            setFilteredApplyList((AnnonceFromApi.applications == undefined)?[]:AnnonceFromApi.applications);
        }
        setApplyListFromAPI()
    }, []
    )


    function handleSearch(event: any) {

        setActiveCloseFilter(-1);

        if (event.currentTarget.value === "") {
            setFilteredApplyList
            (ApplyList);
        }
        else {
            setFilteredApplyList
            (ApplyList.filter((elt : any) => elt.title.toLowerCase().includes(event.currentTarget.value.toLowerCase())))
        }
    }

    function handleCloseFilter(val: any) {
        if (activeCloseFilter !== val) {
            setFilteredApplyList
            (ApplyList.filter((elt: any) => elt.closed == val));
            setActiveCloseFilter(val);
        }
        else {
            setFilteredApplyList
            (ApplyList);
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
                    {filteredApllyList.length == 0 ?
                            <Divider>
                                <Typography variant="overline" display="block" style={{ color: "#838383" }}>
                                    Aucune annonce
                                </Typography>
                            </Divider>
                        :
                        <div>
                            <Stack spacing={2}>
                            <Divider />
                                {filteredApllyList.map((entry: any) => {console.log("annonce:" , entry)
                                    return (
                                        <CompanyApplyCard title={entry.title} content={entry.message} key={entry._id} candidateId={entry.candidateId}/>
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