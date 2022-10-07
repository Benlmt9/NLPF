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
// function AnnonceCard(props: any) {

//     return (
//         <Card sx={{ minWidth: 150, backgroundImage: "url(https://imgs.search.brave.com/mRqotRnngvez9A8ySJ_haMVM8DeOx3ntd5EQSPuBMZI/rs:fit:1200:680:1/g:ce/aHR0cHM6Ly9jZG4t/c3RhdGljLmZpbmRs/eS5jb20vd3AtY29u/dGVudC91cGxvYWRz/L3NpdGVzLzc5NC8y/MDE5LzAzL2Nhbi1j/b3JwLWhlYWRlcmlt/YWdlLmpwZw)", backgroundSize: "cover", backgroundPosition: "center" }} color="text.secondary" key={props.key}>
//           {/* <CardMedia
//             component="img"
//             height="140"
//             src=""
//             alt="green iguana"
//           /> */}
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {props.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {props.description}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small">Learn More</Button>
//           </CardActions>
//         </Card>
//       );

// }



// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
type Mentor = { activationDate: any }
function AnnonceCard(props: any) {
  const [expanded, setExpanded] = React.useState(false);
  const [OwnerInfo, setOwnerInfo] = React.useState({name : ""});
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {
          props.canApply ? <Button sx={{marginLeft: 'auto'}} variant="contained" endIcon={<SendIcon />} onClick=
          {(e) => navigate("/annonces/" + props.annonceId)}> Postuler
          </Button>: <></>
        }
        {/* <ExpandMore
          // expand={expanded}
          // onClick={handleExpandClick}
          // aria-expanded={expanded}
          // aria-label="show more"
          >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default AnnonceCard
