import React from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import AnnonceCard from "../components/AnnonceCard";
import { getAnnonceWithId, getSpecificAnnonces, postQuizAnswers } from "../utils";
import { Box, Button, ButtonGroup, Divider, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { postApply } from "../utils";
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from '../contexts/user';
import { useNavigate } from 'react-router-dom';
import { getQuizz, getQuizzWithId } from "../utils";
import Pagination from '@mui/material/Pagination';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function DetailPage()
{
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [annonce, setAnnonce] = React.useState({title:"", description:"", ownerId:"", _id:"", city:"",remote:"", quizId:""});
    const [message, setMessage] = React.useState({});
    const { annonceId } = useParams();
    const { user, setUser } = React.useContext(UserContext);
    const valueUser = { user, setUser };

    const [Quiz, setQuiz] = React.useState({name:"", questions:[{label: "", answers: []}]});
    const [quizAnswers, setQuizAnswers] = React.useState([""]);
    const [quizQuesionId, setQuizQuestionId] = React.useState([""]);
    const [ isAtQuestion, setIsAtQuestion] = React.useState(1);

    const [debugForm, setDebugForm] = React.useState("");

    React.useEffect(() => {
        async function setAnnoncesListFromAPI() {
            const AnnoncesFromApi = await getAnnonceWithId(cookies.auth_token, annonceId);
            setAnnonce(AnnoncesFromApi);
            console.log("coucou annonce",AnnoncesFromApi);
            console.log("coucou annonce quiz",AnnoncesFromApi.quizId);
            const tmpQuiz = await getQuizzWithId(cookies.auth_token, AnnoncesFromApi.quizId);
            setQuiz(tmpQuiz);
            console.log("quizz",tmpQuiz);
            var tmpReactQuizAnswers = [];
            var tmpReactQuizQuestionId = [];
            for (let index = 0; index < tmpQuiz.questions.length; index++) {
                tmpReactQuizAnswers.push("");
                tmpReactQuizQuestionId.push(tmpQuiz.questions[index]._id);
            }
            setQuizAnswers(tmpReactQuizAnswers);
            setQuizQuestionId(tmpReactQuizQuestionId);

        }
        setAnnoncesListFromAPI()
    }, []
    )

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setIsAtQuestion(value);
        setDebugForm(quizAnswers[value -1])
      };

      const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        var tmpQuizAnswers = quizAnswers;
        tmpQuizAnswers[isAtQuestion -1] = (event.target as HTMLInputElement).value;
        setQuizAnswers(tmpQuizAnswers);
        setDebugForm((event.target as HTMLInputElement).value);
      };

      async function HandlePost(){
        const tmpresult = await postQuizAnswers(cookies.auth_token ,{quizId: annonce.quizId, answers: quizAnswers, questionsIds: quizQuesionId});
        await postApply(cookies.auth_token, annonceId, {message : message, candidateId: user.id, quizResponseId: tmpresult._id, score: tmpresult.score});
      }
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
            {(Quiz !== undefined && Quiz.questions !== undefined)? <>
            <Card sx={{ minWidth: 300 }}>

                <CardHeader
                avatar={<></>}
                action={<></>}
                title={"Question numéro " + isAtQuestion}
                //   subheader={Quiz.questions[isAtQuestion].label}
                />
                {/* <CardMedia sx={{ minWidth: 300, backgroundImage: "url(https://imgs.search.brave.com/mRqotRnngvez9A8ySJ_haMVM8DeOx3ntd5EQSPuBMZI/rs:fit:1200:680:1/g:ce/aHR0cHM6Ly9jZG4t/c3RhdGljLmZpbmRs/eS5jb20vd3AtY29u/dGVudC91cGxvYWRz/L3NpdGVzLzc5NC8y/MDE5LzAzL2Nhbi1j/b3JwLWhlYWRlcmlt/YWdlLmpwZw)", backgroundSize: "cover", backgroundPosition: "center" }} color="text.secondary"
                component="img"
                height="194"
                /> */}
                <CardContent>
                {(Quiz.questions !== undefined && Quiz.questions[isAtQuestion -1]!== undefined && Quiz.questions[isAtQuestion -1].answers !== undefined)?<><FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">{Quiz.questions[isAtQuestion -1].label}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        // value={quizAnswers[isAtQuestion -1]}
                        value={debugForm}
                        onChange={handleChangeForm}
                    >
                        {Quiz.questions[isAtQuestion -1].answers.map((entry: any) => {console.log("annonce:" , entry)
                                    return (
                                        <FormControlLabel value={entry} control={<Radio />} label={entry} />
                                    )
                                }
                                )}
                    </RadioGroup>
                </FormControl></>: <></>}
                </CardContent>
                <CardActions disableSpacing>
                </CardActions>
            </Card>
            <Pagination count={Quiz.questions.length} color="secondary" page={isAtQuestion} onChange={handleChange}/></>
            :<></>}
            {/* <Quizz quizId={annonce.quizId} title={annonce.title}></Quizz> */}
            <Button sx={{marginLeft: 'auto'}} variant="contained" endIcon={<SendIcon />} onClick=
          {async(e) => {await HandlePost()}}> Postuler
            </Button>
        </div>
    )
}
export default DetailPage;