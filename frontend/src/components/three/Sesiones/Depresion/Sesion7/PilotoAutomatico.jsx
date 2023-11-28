import React, { useState, useEffect } from 'react';
import { FormControlLabel, RadioGroup } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    StyledTypographyTitle2,
    StyledBox,
    StyledTypographyText,
    ButtonContainer,
    Theme,
    CenteredContainer,
    StyledPaperEros,
    QuestionHeading,
    RadioGroupContainer,
    ModRadio,
    StyledButton,
    StyledButtonCustom,
    StyledTextArea,
    CenteredTextArea,
} from '../../../../sharedStyles';



const PilotoAutomatico = () => {
    const [questions, setQuestions] = useState([]);
    const [idQuestions, setIdQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showIntro, setShowIntro] = useState(false);
    const [pensamientosUsr, setPensamientosUsr] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [idUsuario, setIdUsuario] = useState('');

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

    const handlePensamientoUsr = (e) => {
        setPensamientosUsr(e.target.value);
    };

    const handleContinue = () => {
        if (!showIntro) {
            Axios.post('http://localhost:3001/checkSesionActiva', {

                idUsuario: idUsuario

            }).then((response) => {

                Axios.post('http://localhost:3001/getPreguntasDepresion', {

                    idSesion: response.data.idSesion,
                    cuestionario: 'PilotoAuto'

                }).then((response) => {

                    const idQuestion = [];

                    const question = response.data.Preguntas.map((question, index) => {
                        idQuestion.push(question.idPregunta);
                        return {
                            question: `${index + 1}. ${question.pregunta}`,
                        };
                    });
                    setQuestions(question);
                    setIdQuestions(idQuestion);
                });
            });

            setTimeout(() => {
                setShowIntro(true);
            }, 20);

        } else if (currentQuestionIndex < questions.length - 1) {
            setSelectedOptions([...selectedOptions, selectedOption]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);

        } else {
            setSelectedOptions([...selectedOptions, selectedOption]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleSubmit = () => {
        const datosSesion = 'Sesión completada, pensamiento: '+ pensamientosUsr + ' Respuestas test guardadas en su perfil.';
        Axios.post('http://localhost:3001/subirAnswersForm', {

            idUsuario: idUsuario,
            respuestas: selectedOptions,
            idPregunta: idQuestions,
        });

        Axios.post('http://localhost:3001/changeActiveSesion', {

            idUsuario: idUsuario,
            datosSesion: datosSesion,

        }).then((response) => {
            if (response.status === 200) {

                navigate('/logeadoUser');
            }
        });
    };


    const theme = Theme();

    return (
        <ThemeProvider theme={theme}>
            <CenteredContainer>
                {!showIntro ? (
                    <>
                        <StyledTypographyTitle2 variant="h4" gutterBottom>
                            Ahora te pido que te imagines la siguiente situación
                        </StyledTypographyTitle2>
                        <StyledBox>
                            <StyledTypographyText variant="h6" gutterBottom>
                                Llegas a clase y el profesor anuncia los resultados de un examen super importante del curso,
                                y cuando reparte las notas, ves que tú has sido de los pocos alumnos de clase que ha suspendido.
                                Escribe algunos pensamientos que te vendrían a la cabeza en ese momento:
                            </StyledTypographyText>
                            <CenteredTextArea>
                                <StyledTextArea variant="outlined" onChange={handlePensamientoUsr} maxLength={400}/>
                            </CenteredTextArea>
                            <ButtonContainer>
                                <StyledButton variant="contained" onClick={handleContinue}>
                                    Adelante
                                </StyledButton>
                            </ButtonContainer>
                        </StyledBox>
                    </>
                ) : currentQuestionIndex < questions.length ? (
                    <>
                        <StyledPaperEros>
                            <QuestionHeading>{questions[currentQuestionIndex].question}</QuestionHeading>
                            <RadioGroupContainer>
                                <RadioGroup row value={selectedOption} onChange={handleOptionChange}>
                                    <FormControlLabel value={"No"} control={<ModRadio />} label="No" />
                                    <FormControlLabel value={"Creo que no"} control={<ModRadio />} label="Creo que no" />
                                    <FormControlLabel value={"No lo sé"} control={<ModRadio />} label="No lo sé" />
                                    <FormControlLabel value={"Puede ser"} control={<ModRadio />} label="Puede ser" />
                                    <FormControlLabel value={"Sí"} control={<ModRadio />} label="Sí" />
                                </RadioGroup>
                            </RadioGroupContainer>
                            <ButtonContainer>
                                <StyledButton variant="contained" onClick={handleContinue} disabled={!selectedOption}>
                                    Siguiente
                                </StyledButton>
                            </ButtonContainer>
                        </StyledPaperEros>
                    </>
                ) : (
                    <>
                        <StyledBox>
                            <StyledTypographyText variant="h6" gutterBottom>
                                Ya hemos terminado la sesión, espero que este método te sirva en tu día a día cuando te ronda un pensamiento
                                en la cabeza que no te está haciendo sentir bien. Quizás cuestionando si de verdad te está siendo útil
                                retener ese pensamiento puedas darte cuenta y te sea más fácil dejarlo ir. Nos vemos en la siguiente sesión. ¡Hasta pronto!
                            </StyledTypographyText>
                            <ButtonContainer>
                                <StyledButtonCustom variant="contained" onClick={handleSubmit}>Continuar</StyledButtonCustom>
                            </ButtonContainer>
                        </StyledBox>
                    </>
                )}
            </CenteredContainer>
        </ThemeProvider>
    );
};

export default PilotoAutomatico;