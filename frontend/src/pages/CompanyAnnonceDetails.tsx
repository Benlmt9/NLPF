import React from 'react'
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import AnnonceCard from '../components/AnnonceCard';
import { getAnnonces, getAnnoncesOfCompany, getAnnonceWithId } from "../utils"
import { useCookies } from "react-cookie";
import LockOutlined from '@mui/icons-material/LockOutlined';
import CompanyAnnonceCard from '../components/CompanyAnnonceCard';
import { useParams } from "react-router-dom";
import CompanyApplyCard from '../components/ApplyCard';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

export default function CompanyAnnonceDetails()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [ApplyList, setApplyList] = React.useState([]);
    const [ClosedApplyList, setClosedApplyList] = React.useState([]);
    const [filteredApplyList, setFilteredApplyList] = React.useState([]);
    const [activeCloseFilter, setActiveCloseFilter] = React.useState(-1);
    const { myAnnonceId } = useParams();
    const [valueTable, setValueTable] = React.useState("1");

    React.useEffect(() => {
        async function setApplyListFromAPI() {
            const AnnonceFromApi = await getAnnonceWithId(cookies.auth_token, myAnnonceId);
            console.log(AnnonceFromApi);
            setApplyList((AnnonceFromApi.applications == undefined)?[]:AnnonceFromApi.applications);
            setFilteredApplyList((AnnonceFromApi.applications == undefined)?[]:AnnonceFromApi.applications);
            setClosedApplyList((AnnonceFromApi.rejectedApplications == undefined)?[]:AnnonceFromApi.rejectedApplications);
        }
        setApplyListFromAPI()
    }, []
    )

    function isInClosed(applId:any){
        if (ClosedApplyList.filter((elt: any) => elt == applId).length > 0){
            console.log("is in",applId);
            return true;
        }
        console.log("isn't in",applId);
        console.log(ClosedApplyList)
        return false;
    }

    const handleTableChange = (event: React.SyntheticEvent, newValue: string) => {
        setValueTable(newValue);
        console.log()
        if (newValue=="1"){
            setFilteredApplyList(ApplyList);
        }
        if (newValue=="2"){
            setFilteredApplyList(ApplyList.filter((elt: any) => isInClosed(elt.applicationId)==false));
        }
        if (newValue=="3"){
            setFilteredApplyList(ApplyList.filter((elt: any) => isInClosed(elt.applicationId)));
        }
      };

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
                    <TabContext value={valueTable}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTableChange} aria-label="lab API tabs example">
                            <Tab label="Toutes les annonces" value="1" />
                            <Tab label="Ouverte" value="2" />
                            <Tab label="Ouverte" value="3" />
                        </TabList>
                        </Box>
                        <TabPanel value="1">Vous avez un total de {filteredApplyList.length} {(filteredApplyList.length >1)?"candidatures": "candidature"}</TabPanel>
                        <TabPanel value="2">Vous avez {filteredApplyList.length} {(filteredApplyList.length >1)?"candidatures ouvertes": "candidature ouverte"}</TabPanel>
                        <TabPanel value="3">Vous avez {filteredApplyList.length} {(filteredApplyList.length >1)?"candidatures refusées": "candidature refusée"}</TabPanel>
                    </TabContext>
                    {filteredApplyList.length == 0 ?
                            <Divider>
                                <Typography variant="overline" display="block" style={{ color: "#838383" }}>
                                    Aucune annonce
                                </Typography>
                            </Divider>
                        :
                        <div>
                            <Stack spacing={2}>
                            <Divider />
                                {filteredApplyList.map((entry: any) => {console.log("annonce:" , entry)
                                    return (
                                        <CompanyApplyCard title={entry.title} content={entry.message} key={entry._id} candidateId={entry.candidateId} annonceId={myAnnonceId} applicationId={entry.applicationId}/>
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