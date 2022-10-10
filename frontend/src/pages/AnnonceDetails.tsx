import React from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import AnnonceCard from "../components/AnnonceCard";
import { getAnnonceWithId, getSpecificAnnonces } from "../utils";
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { postApply } from "../utils";
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from '../contexts/user';
import { useNavigate } from 'react-router-dom';
function DetailPage()
{
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [annonce, setAnnonce] = React.useState({title:"", description:"", ownerId:"", _id:"", city:"",remote:""});
    const [message, setMessage] = React.useState({});
    const { annonceId } = useParams();
    const { user, setUser } = React.useContext(UserContext);
    const valueUser = { user, setUser };


    React.useEffect(() => {
        async function setAnnoncesListFromAPI() {
            const AnnoncesFromApi = await getAnnonceWithId(cookies.auth_token, annonceId);
            setAnnonce(AnnoncesFromApi);
            console.log("coucou",AnnoncesFromApi);
        }
        setAnnoncesListFromAPI()
    }, []
    )



    return (
        <div>
            <AnnonceCard title={annonce.title} description={annonce.description} key={annonce._id} ownerId={annonce.ownerId} annonceId={annonce._id} canApply={false} city={annonce.city} remote={annonce.remote}/>
            <TextField
            id="outlined-multiline-static"
            label="Mes motivations"
            multiline
            rows={10}
            fullWidth
            onChange={(e)=> setMessage(e.target.value)}
            />
            <Button sx={{marginLeft: 'auto'}} variant="contained" endIcon={<SendIcon />} onClick=
          {async(e) => {await postApply(cookies.auth_token, annonceId, {message : message, candidateId: user.id}); navigate('/annonces') }}> Postuler
            </Button>
        </div>
    )
}
export default DetailPage;