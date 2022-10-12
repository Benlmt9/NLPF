import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCookies } from "react-cookie";
import SendIcon from '@mui/icons-material/Send';
import { Link, useNavigate } from 'react-router-dom';

import { alpha, styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getCompanyWithId, getUserData, patchApply, patchOffersState } from '../utils';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import Pie from "./Pie";
import AnnonceCard from './AnnonceCard';
import AppWidgetSummary from './AppWidget';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from './Iconify';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Chip from '@mui/material/Chip';
// import PercentageCircle from 'reactjs-percentage-circle';
import axios from 'axios'
import fileDownload from 'js-file-download'


type Mentor = { activationDate: any }
function CompanyApplyCard(props: any) {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [OwnerInfo, setOwnerInfo] = React.useState({name : "", email:"", cvUrl : "https://iili.io//Z3Q4LP.png", avatarUrl:""});
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    async function setOwnerInfoFromAPI() {
        const OwnerInfoFromApi = await getUserData(cookies.auth_token, props.candidateId);
        // const data = await AnnoncesFromApi.json();
        console.log(OwnerInfoFromApi);
        setOwnerInfo(OwnerInfoFromApi);
    }
    setOwnerInfoFromAPI()
    // console.log("annonce lisst :",AnnoncesList);
}, []
)

function handleDownload(url :any, filename: any){
  axios.get(url, {
    responseType: 'blob',
  })
  .then((res) => {
    fileDownload(res.data, filename)
  })
};

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardHeader
        avatar={(OwnerInfo.avatarUrl !== undefined)?<Avatar alt="Remy Sharp" src={OwnerInfo.avatarUrl}/>:<Avatar alt="Remy Sharp"/>}
        action={<><Pie percentage={props.percent} colour={(props.percent > 70)?"green":(props.percent > 40)? "orange": "red"} demension={50} center/>
        </>
        }
        title={OwnerInfo.name + " - " + OwnerInfo.email}
        subheader={"September 14, 2016"}
        />
        <Grid>
        <div>{props.content}</div></Grid>
        {/* <PercentageCircle percent={80}></PercentageCircle> */}
        {/* <C3Chart
          style={{ height: "12rem" }}
          data={{
            columns: [
              // each columns data
              ["data1", 63],
              ["data2", 37],
            ],
            type: "donut", // default type of chart
            colors: {
              data1: colors["green"],
              data2: colors["green-light"],
            },
            names: {
              // name of each serie
              data1: "Maximum",
              data2: "Minimum",
            },
          }}
          legend={{
            show: false, //hide legend
          }}
          padding={{
            bottom: 0,
            top: 0,
          }}
        /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {OwnerInfo.cvUrl !== undefined?<Button onClick={() => handleDownload(OwnerInfo.cvUrl, OwnerInfo.name + "CV.png")}>Télécharger le cv</Button>: <></>}
        <div style={{marginLeft: 'auto'}}>
          {(props.refused)?<Button color="error" disabled>Refusée<ClearIcon color="error"></ClearIcon></Button>:<>
            <Button color="error" onClick={async (e) => {await patchApply(cookies.auth_token, props.annonceId, "REJECTED", "", props.applicationId, props.candidateId); window.location.reload()}}><ClearIcon/>
            </Button><Button color="success" onClick={async (e) => {await patchApply(cookies.auth_token, props.annonceId, "ACCEPTED", "", props.applicationId, props.candidateId); window.location.reload()}}><DoneOutlineIcon/></Button>
        </>}</div>
        {/* <Button sx={{marginLeft: 'auto'}} variant="contained" endIcon={<SendIcon />} onClick=
          {(e) => navigate("/myannonces/" + props.annonceId)}> Gérer l'annonce
          </Button> */}
      </CardActions>
    </Card>
  );
}

export default CompanyApplyCard
