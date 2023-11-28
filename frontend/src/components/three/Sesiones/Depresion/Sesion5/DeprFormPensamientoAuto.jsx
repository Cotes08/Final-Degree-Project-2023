import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    StyledTypographyTitlePensAuto,
    StyledTextPensAuto,
    StyledBox,
    StyledTypographyText,
    StyledButtonPensAuto,
    ButtonContainer,
    Theme,
    CenteredContainer,
    StyledPaperBDI,
    QuestionContainer,
    QuestionWrapper,
    StyledButton,

} from '../../../../sharedStyles';




const DeprFormPensamientoAuto = () => {

    const [idUsuario, setIdUsuario] = useState('');
    const [questions, setQuestions] = useState([]);
    const [idQuestions, setIdQuestions] = useState([]);
    const [values, setValues] = useState(Array(questions.length).fill(''));
    const [showInfo, setShowInfo] = useState(0);
    const [results, setResults] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [answers] = useState(['Pensamiento polarizado', 'Sobregeneralización', 'Falacia de justicia']);


    //Variable de navegacion de router-dom
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;//Es obligatorio que este esto ya que si no se pone no podremos ver si hay una sesion activa

    //Comprobamos si es usuario logeado, si no lo es va a login, en el caso de que sea logeado pero psicologo se va a logeadoPsico
    useEffect(() => {
        Axios.get('http://localhost:3001/loginUsr').then((response) => {

            if (response.data.loggedIn !== true) {

                navigate('/');

            } else if (response.data.loggedIn === true && response.data.user.Psicologo === true) {

                navigate('/logeadoPsico');

            }
            setIdUsuario(response.data.user.Id);
        });
    });


    useEffect(() => {
        Axios.post('http://localhost:3001/checkSesionActiva', {

            idUsuario: idUsuario

        }).then((response) => {

            Axios.post('http://localhost:3001/getPreguntasDepresion', {

                idSesion: response.data.idSesion,
                cuestionario: 'PensamientoAuto'

            }).then((response) => {

                const idQuestion = [];

                const question = response.data.Preguntas.map((question, index) => {
                    const options = question.opcion.replace(/'/g, '').split(', ');
                    idQuestion.push(question.idPregunta);
                    return {
                        question: `${question.pregunta}`,
                        options: options
                    };
                });
                setQuestions(question);
                setValues(Array(question.length).fill(''));
                setIdQuestions(idQuestion);
            });
        });
    }, [idUsuario])


    const handleChange = (event, index) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
    };

    const handleSubmit = () => {

        Axios.post('http://localhost:3001/subirAnswersForm', {

            idUsuario: idUsuario,
            respuestas: values,
            idPregunta: idQuestions,

        });
        checkAnswers();
        nextInfo();
    };

    const checkAnswers = () => {
        const resultados = values.map((value, index) => value === answers[index]);
        setResults(resultados);
        setCorrectAnswers(resultados.filter((result) => result === true).length);

    };

    const nextInfo = () => {
        setShowInfo((prevIndex) => {
            const newIndex = prevIndex + 1;

            if (newIndex === 3) {

                const datosSesion = 'Sesión completada, respuestas guardadas en su perfil.';

                Axios.post('http://localhost:3001/changeActiveSesion', {

                    idUsuario: idUsuario,
                    datosSesion: datosSesion,

                }).then((response) => {
                    if (response.status === 200) {

                        navigate('/logeadoUser');
                    }
                });
            }

            return newIndex;
        })

    }

    const fin = values.length === questions.length && values.every((value) => value !== '');
    const theme = Theme();

    return (
        <ThemeProvider theme={theme}>
            <CenteredContainer>
                {showInfo === 0 ? (
                    <StyledPaperBDI>
                        <QuestionContainer>
                            {questions.map((question, index) => (
                                <QuestionWrapper key={index}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" sx={{ fontSize: '1.5rem' }}>{question.question}</FormLabel>
                                        <RadioGroup
                                            name={`question${index + 1}`}
                                            value={values[index]}
                                            onChange={(event) => handleChange(event, index)}
                                        >
                                            {question.options.map((option, index) => (
                                                <FormControlLabel key={index} value={option} control={<Radio />} label={<Typography variant='h5'>{option}</Typography>} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </QuestionWrapper>
                            ))}
                            <StyledButton variant="contained" disabled={!fin} onClick={handleSubmit}>Enviar</StyledButton>
                        </QuestionContainer>
                    </StyledPaperBDI >
                ) : showInfo === 1 ? (
                    <>
                        {correctAnswers === 1 ? (
                            <>
                                <StyledTypographyTitlePensAuto variant="h4" gutterBottom>
                                    Has acertado {correctAnswers} pregunta.
                                </StyledTypographyTitlePensAuto>

                                {results.map((result, index) => !result && (
                                    <StyledTextPensAuto>Has fallado el caso {index + 1}. La respuesta correcta es: {answers[index]}</StyledTextPensAuto>
                                ))}
                            </>

                        ) : correctAnswers === 3 ? (

                            <>
                                <StyledTypographyTitlePensAuto variant="h4" gutterBottom>
                                    Has acertado todas las preguntas.
                                </StyledTypographyTitlePensAuto>

                                <StyledTextPensAuto>¡Enhorabuena! Sigue así, tú puedes</StyledTextPensAuto>

                            </>
                        ) : (
                            <>
                                <StyledTypographyTitlePensAuto variant="h4" gutterBottom>
                                    Has acertado {correctAnswers} preguntas.
                                </StyledTypographyTitlePensAuto>


                                {results.map((result, index) => !result && (
                                    <StyledTextPensAuto>Has fallado el caso {index + 1}. La respuesta correcta es: {answers[index]}</StyledTextPensAuto>
                                ))}
                            </>
                        )}

                        <StyledButtonPensAuto variant="contained" onClick={nextInfo}>
                            Continuar
                        </StyledButtonPensAuto>
                    </>
                ) : (
                    <>
                        <StyledBox>
                            <StyledTypographyText variant="h6" gutterBottom>
                                Muy bien, ya hemos finalizado la sesión, espero que hayas aprendido un poco más sobre nuestros pensamientos y que te ayude a identificarlos
                                si alguna vez los tienes. No es malo tenerlos, al fin y al cabo,todos/as tenemos pensamientos que pueden hacernos sentir bien o no tan bien,
                                pero no se pueden controlar. En la siguiente sesión te explicaré cómo reconocer esos pensamientos cuando los tenemos,
                                aceptar que están ahí y saber dejarlos ir en el caso de que no nos haga sentir bien. ¡Hasta pronto!
                            </StyledTypographyText>
                            <ButtonContainer>
                                <StyledButtonPensAuto variant="contained" onClick={nextInfo}>
                                    ¡Hasta pronto!
                                </StyledButtonPensAuto>
                            </ButtonContainer>
                        </StyledBox>
                    </>
                )}
            </CenteredContainer >
        </ThemeProvider >
    );
}


export default DeprFormPensamientoAuto;