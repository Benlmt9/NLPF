import React from 'react'
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, InputAdornment, Stack, TextField, Typography, Modal, Card, CardContent, CardHeader } from '@mui/material';
import AnnonceCard from '../components/AnnonceCard';
import { getAnnonces, getAnnoncesOfCompany } from "../utils"
import { useCookies } from "react-cookie";
import LockOutlined from '@mui/icons-material/LockOutlined';
import CompanyAnnonceCard from '../components/CompanyAnnonceCard';
import CreateAnnonce from '../components/CreateAnnonce';
import { UserContext } from '../contexts/user';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Badge from '@mui/material/Badge';
import Pie from "../components/Pie";

export default function CompanyAnnonce()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [AnnoncesList, setAnnoncesList] = React.useState([]);
    const [filteredAnnonceList, setFilteredAnnonceList] = React.useState([]);
    const [activeCloseFilter, setActiveCloseFilter] = React.useState(-1);
    const [isCreateAnnonceModalOpen, setIsCreateAnnonceModalOpen] = React.useState(false);
    const { user, setUser } = React.useContext(UserContext);
    const [totalPost, setTotalPost] = React.useState(0);
    const [averageScore, setAverageScore] = React.useState(0);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    React.useEffect(() => {
        async function setAnnoncesListFromAPI() {
            const AnnoncesFromApi = await getAnnoncesOfCompany(cookies.auth_token, user.id);
            console.log("promise", AnnoncesFromApi);
            var tmptotalPost = 0;
            var tmpaverageScore = 0;
            var divise = 100000;
            // const data = await AnnoncesFromApi.json();
            // console.log(AnnoncesFromApi);
            console.log("userid",user.id);
            setAnnoncesList(AnnoncesFromApi);
            setFilteredAnnonceList(AnnoncesFromApi);
            for (let index = 0; index < AnnoncesFromApi.length; index++) {
                if (AnnoncesFromApi[index].applications !== undefined){
                    console.log("appli", AnnoncesFromApi[index].applications);
                    tmptotalPost += (AnnoncesFromApi[index].applications !== undefined)? AnnoncesFromApi[index].applications.length: 0;
                    for (let npapp = 0; npapp < AnnoncesFromApi[index].applications.length; npapp++) {
                        if (AnnoncesFromApi[index].applications[npapp].score !== undefined){
                        tmpaverageScore += AnnoncesFromApi[index].applications[npapp].score;
                        divise += 1;}
                    }
                }
            }
            console.log("total", tmptotalPost);
            setTotalPost(tmptotalPost);
            const avera = tmpaverageScore / divise;
            setAverageScore(avera);
        }
        setAnnoncesListFromAPI();
        console.log("testestest", user);
        // console.log("annonce lisst :",AnnoncesList);
    }, []
    )
    const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue=="1"){
        setFilteredAnnonceList(AnnoncesList);
    }
    if (newValue=="2"){
        setFilteredAnnonceList(AnnoncesList.filter((elt: any) => elt.state == "OPEN"));
    }
    if (newValue=="3"){
        setFilteredAnnonceList(AnnoncesList.filter((elt: any) => elt.state == "HIDDEN"));
    }
    if (newValue=="4"){
        setFilteredAnnonceList(AnnoncesList.filter((elt: any) => elt.state == "CLOSED"));
    }
  };

  function nbNotif(entry : any){
    return ((entry.applications != undefined)?entry.applications.length : 0) - ((entry.rejectedApplications != undefined)?entry.rejectedApplications.length : 0);
  }

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
        <Grid
  container
  direction="row"
  alignItems="center"
  justifyContent="center"
  
>
    <Grid item>
        <Box sx={{
            width: "800px",
        }}
        >
            <div>
                <Stack spacing={1}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <h1>Mes annonces</h1>
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
                            <Button onClick={()=>setIsCreateAnnonceModalOpen(true)}>Créer une annonce</Button>
                            <Modal
                            open={isCreateAnnonceModalOpen}
                            onClose={()=>setIsCreateAnnonceModalOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <CreateAnnonce></CreateAnnonce>
                                </Box>
                            </Modal>
                        </Grid>
                    </Grid>
                    <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Toutes les annonces" value="1" />
            <Tab label="Ouverte" value="2" />
            <Tab label="Cachée" value="3" />
            <Tab label="Cloturée" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">Vous avez un total de {filteredAnnonceList.length} {(filteredAnnonceList.length >1)?"annonces": "annonce"}</TabPanel>
        <TabPanel value="2">Vous avez {filteredAnnonceList.length} {(filteredAnnonceList.length >1)?"annonces ouvertes": "annonce ouverte"}</TabPanel>
        <TabPanel value="3">Vous avez {filteredAnnonceList.length} {(filteredAnnonceList.length >1)?"annonces cachées": "annonce cachée"}</TabPanel>
        <TabPanel value="4">Vous avez {filteredAnnonceList.length} {(filteredAnnonceList.length >1)?"annonces cloturées": "annonce cloturée"}</TabPanel>
      </TabContext>
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
                                        <CompanyAnnonceCard title={entry.title} comments={(entry.applications != undefined)? entry.applications.length:0} description={entry.description} key={entry._id} ownerId={entry.ownerId} state={entry.state} annonceId={entry._id} canApply={true} notifs={nbNotif(entry)}/>
                                    )
                                }
                                )}
                            </Stack>
                        </div>
                    }
                </Stack>
            </div>
        </Box></Grid>
        <Grid item sx={{ position: 'fixed', bottom: "auto",  right: 40, top:100 }}><Grid><Card><CardHeader action={<Typography>Nombre de postulations sur vos annonces :</Typography>}></CardHeader><CardContent>{totalPost}</CardContent></Card></Grid>
        <Grid marginTop={5}><Card><CardHeader action={<Typography >Score moyen sur vos quizzs</Typography>}></CardHeader><CardContent><Grid marginLeft={"auto"}><Pie percentage={averageScore} colour={(averageScore > 70)?"green":(averageScore > 40)? "orange": "red"} dimension={50}/></Grid></CardContent></Card></Grid></Grid>
    </Grid>
    );
}