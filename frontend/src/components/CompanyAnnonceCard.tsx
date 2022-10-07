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
import { getCompanyWithId, patchOffersState } from '../utils';
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
// import PercentageCircle from 'reactjs-percentage-circle';

type Mentor = { activationDate: any }
function CompanyAnnonceCard(props: any) {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [OwnerInfo, setOwnerInfo] = React.useState({name : ""});
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
        const OwnerInfoFromApi = await getCompanyWithId(cookies.auth_token, props.ownerId);
        // const data = await AnnoncesFromApi.json();
        console.log(OwnerInfoFromApi);
        setOwnerInfo(OwnerInfoFromApi);
    }
    setOwnerInfoFromAPI()
    // console.log("annonce lisst :",AnnoncesList);
}, []
)

  return (
    <Card sx={{ minWidth: 300 }}>
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
        action={<>
          {(props.state == "OPEN")? 
            <>
            <Button color="info" onClick={async (e) => {await patchOffersState(cookies.auth_token, props.annonceId, "HIDDEN"); window.location.reload()}}><VisibilityIcon/>
            </Button><Button color="error" onClick={async (e) => {await patchOffersState(cookies.auth_token, props.annonceId, "CLOSED"); window.location.reload()}}><ClearIcon/></Button>
            </> 
          :(props.state == "HIDDEN") ?
          <>
          <Button color="info" onClick={async (e) => {await patchOffersState(cookies.auth_token, props.annonceId, "OPEN"); window.location.reload()}}><VisibilityOffIcon/>
          </Button><Button color="error" onClick={async (e) => {await patchOffersState(cookies.auth_token, props.annonceId, "CLOSED"); window.location.reload()}}><ClearIcon/></Button>
          </>
          :<></> }
        </>
        }
        title={props.title + " - " + OwnerInfo.name}
        subheader={"September 14, 2016"}
        />
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button sx={{marginLeft: 'auto'}} variant="contained" endIcon={<SendIcon />} onClick=
          {(e) => navigate("/myannonces/" + props.annonceId)}> Gérer l'annonce
          </Button>
      </CardActions>
    </Card>
  );
}

export default CompanyAnnonceCard
