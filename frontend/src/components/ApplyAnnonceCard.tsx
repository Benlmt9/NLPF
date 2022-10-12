import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCookies } from "react-cookie";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getCompanyWithId } from '../utils';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { alpha } from '@mui/material/styles';
import Iconify from './Iconify';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { UserContext } from '../contexts/user';
import Pie from "./Pie";
import { Grid } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';

type Mentor = { activationDate: any }
function ApplyAnnonceCard(props: any) {
  const [expanded, setExpanded] = React.useState(false);
  const [OwnerInfo, setOwnerInfo] = React.useState({name : ""});
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  }));

  React.useEffect(() => {
    async function setOwnerInfoFromAPI() {
        const OwnerInfoFromApi = await getCompanyWithId(cookies.auth_token, props.ownerId);
        // const data = await AnnoncesFromApi.json();
        // console.log(OwnerInfoFromApi);
        setOwnerInfo(OwnerInfoFromApi);
    }
    setOwnerInfoFromAPI()
    // console.log("annonce lisst :",AnnoncesList);
}, []
)
console.log("props is accepted", props.isAccepted, props.annonceId);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
    <Card sx={{ minWidth: 300, minHeight: 400, maxHeight:400 }}>
      <CardHeader
        avatar={
          <IconWrapperStyle
        sx={{
          color: (theme : any ) => theme.palette['primary'].dark,
          backgroundImage: (theme : any ) =>
            `linear-gradient(135deg, ${alpha(theme.palette['primary'].dark, 0)} 0%, ${alpha(
              theme.palette['primary'].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={'ant-design:apple-filled'} sx={24} height={24}/>
      </IconWrapperStyle>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title + " - " + OwnerInfo.name}
        subheader={"September 14, 2016"}
        />
      <CardMedia sx={{ minWidth: 300, backgroundImage: "url(https://imgs.search.brave.com/mRqotRnngvez9A8ySJ_haMVM8DeOx3ntd5EQSPuBMZI/rs:fit:1200:680:1/g:ce/aHR0cHM6Ly9jZG4t/c3RhdGljLmZpbmRs/eS5jb20vd3AtY29u/dGVudC91cGxvYWRz/L3NpdGVzLzc5NC8y/MDE5LzAzL2Nhbi1j/b3JwLWhlYWRlcmlt/YWdlLmpwZw)", backgroundSize: "cover", backgroundPosition: "center" }} color="text.secondary"
        component="img"
        height="194"  
        // image="/static/images/cards/paella.jpg"
        // alt="Paella dish"
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <LocationOnIcon/>{props.city} {" | "} 
          <MouseIcon />{(props.remote == "NO")?"Pas de remote":(props.remote == "FULL")?"En remote": "En semi remote"}
        {
          props.canApply ? <Button sx={{marginLeft: 'auto'}} variant="contained" endIcon={<SendIcon />} onClick=
          {(e) => navigate("/annonces/" + props.annonceId)}> Postuler
          </Button>: <></>
        }
      </CardActions>
    </Card></Grid>
    <Grid item>
    
    <Card sx={{ minWidth: 500, minHeight: 400, maxHeight:400 }}>
      <CardHeader
      //   avatar={
      //     <IconWrapperStyle
      //   sx={{
      //     color: (theme : any ) => theme.palette['primary'].dark,
      //     backgroundImage: (theme : any ) =>
      //       `linear-gradient(135deg, ${alpha(theme.palette['primary'].dark, 0)} 0%, ${alpha(
      //         theme.palette['primary'].dark,
      //         0.24
      //       )} 100%)`,
      //   }}
      // >
      //   <Iconify icon={'ant-design:apple-filled'} sx={24} height={24}/>
      // </IconWrapperStyle>
      //   }
        action={
          (props.score != undefined)?<Pie percentage={props.score} colour={(props.score > 70)?"green":(props.score > 40)? "orange": "red"} demension={50} center/>:<></>
        }
        title={"Status :" + ((props.isAccepted)? " Accepté": (props.isRefused)? " Refusé": " En cours") }
        subheader={user.name + " - "+user.email}
        />
      {/* <CardMedia sx={{ minWidth: 300, backgroundImage: "url(https://imgs.search.brave.com/mRqotRnngvez9A8ySJ_haMVM8DeOx3ntd5EQSPuBMZI/rs:fit:1200:680:1/g:ce/aHR0cHM6Ly9jZG4t/c3RhdGljLmZpbmRs/eS5jb20vd3AtY29u/dGVudC91cGxvYWRz/L3NpdGVzLzc5NC8y/MDE5LzAzL2Nhbi1j/b3JwLWhlYWRlcmlt/YWdlLmpwZw)", backgroundSize: "cover", backgroundPosition: "center" }} color="text.secondary"
        component="img"
        height="194"  
        /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
          props.canApply ? <Button sx={{marginLeft: 'auto'}} variant="contained" endIcon={<SendIcon />} onClick=
          {(e) => navigate("/annonces/" + props.annonceId)}> Postuler
          </Button>: <></>
        }
      </CardActions>
    </Card>
    </Grid>
    </Grid>
  );
}

export default ApplyAnnonceCard
