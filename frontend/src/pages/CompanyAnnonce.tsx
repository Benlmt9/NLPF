import React from 'react'
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, InputAdornment, Stack, TextField, Typography, Modal } from '@mui/material';
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

export default function CompanyAnnonce()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [AnnoncesList, setAnnoncesList] = React.useState([]);
    const [filteredAnnonceList, setFilteredAnnonceList] = React.useState([]);
    const [activeCloseFilter, setActiveCloseFilter] = React.useState(-1);
    const [isCreateAnnonceModalOpen, setIsCreateAnnonceModalOpen] = React.useState(false);
    const { user, setUser } = React.useContext(UserContext);

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
            // const data = await AnnoncesFromApi.json();
            // console.log(AnnoncesFromApi);
            console.log("userid",user.id);
            setAnnoncesList(AnnoncesFromApi);
            setFilteredAnnonceList(AnnoncesFromApi);
        }
        setAnnoncesListFromAPI()
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
                                        <CompanyAnnonceCard title={entry.title} description={entry.description} key={entry._id} ownerId={entry.ownerId} state={entry.state} annonceId={entry._id} canApply={true}/>
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