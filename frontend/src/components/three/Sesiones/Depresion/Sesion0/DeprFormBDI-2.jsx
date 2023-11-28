import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, Radio, RadioGroup, FormLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    StyledTypographyTitle,
    StyledBox,
    StyledTypographyText,
    StyledTypographyTitle2,
    ButtonContainer,
    Theme,
    CenteredContainer,
    StyledPaperBDI,
    QuestionContainer,
    QuestionWrapper,
    StyledButton,
    StyledButtonCustom
} from '../../../../sharedStyles';




const DeprFormBDI = () => {

    const [questions, setQuestions] = useState([]);
    const [idQuestions, setIdQuestions] = useState([]);
    const [values, setValues] = useState(Array(questions.length).fill(''));
    const [showIntro, setShowIntro] = useState(false);
    const [showSecondIntro, setShowSecondIntro] = useState(false);
    const [showThirdIntro, setshowThirdIntro] = useState(false);
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


    const handleContinue = () => {
        if (!showIntro) {
            setShowIntro(true);
            Axios.post('http://localhost:3001/checkSesionActiva', {

                idUsuario: idUsuario

            }).then((response) => {

                Axios.post('http://localhost:3001/getPreguntasDepresion', {

                    idSesion: response.data.idSesion,
                    cuestionario: 'BDI-II'

                }).then((response) => {

                    const idQuestion = [];

                    const question = response.data.Preguntas.map((question, index) => {
                        const options = question.opcion.replace(/'/g, '').split(', ');
                        idQuestion.push(question.idPregunta);
                        return {
                            question: `${index + 1}) ${question.pregunta}`,
                            options: options
                        };
                    });
                    setQuestions(question);
                    setValues(Array(question.length).fill(''));
                    setIdQuestions(idQuestion);
                });
            });

        } else if (!showSecondIntro) {
            setShowSecondIntro(true);

        } else if (!showThirdIntro) {
            setshowThirdIntro(true);
        }
    };

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
        navigate('/deprFormEros');

    };

    const fin = values.length === questions.length && values.every((value) => value !== '');
    const theme = Theme();

    return (
        <ThemeProvider theme={theme}>
            <CenteredContainer>
                {!showIntro ? (
                    <>
                        <StyledTypographyTitle variant="h4" gutterBottom>
                            ¿Sabías qué es la depresión?
                        </StyledTypographyTitle>
                        <StyledBox>
                            <StyledTypographyText variant="h6" gutterBottom>
                                La depresión es un problema de salud mental caracterizado por tristeza constante, pérdida de placer y/o interés en actividades que antes sí te agradaban…
                                También puede producir alteración del apetito, alteración del sueño (como dormir mucho o tener problemas para conciliar el sueño), cansancio, falta de concentración y rumiación (estar constantemente dándole vueltas a un mismo pensamiento).
                            </StyledTypographyText>
                            <ButtonContainer>
                                <StyledButton variant="contained" onClick={handleContinue}>
                                    Continuar
                                </StyledButton>
                            </ButtonContainer>
                        </StyledBox>
                    </>
                ) : !showSecondIntro ? (
                    <>
                        <StyledTypographyTitle2 variant="h4" gutterBottom>
                            Para saber un poco mas sobre ti me gustaría que realizases un pequeño cuestionario para conocerte mejor.
                        </StyledTypographyTitle2>
                        <ButtonContainer>
                            <StyledButtonCustom variant="contained" onClick={handleContinue}>Continuar</StyledButtonCustom>
                        </ButtonContainer>
                    </>
                ) : !showThirdIntro ? (
                    <>
                        <StyledTypographyTitle variant="h4" gutterBottom>
                            Aquí van las instrucciones:
                        </StyledTypographyTitle>
                        <StyledBox>
                            <StyledTypographyText variant="h6" gutterBottom>
                                Este cuestionario está formado por 21 grupos de frases. Por favor, lea cada grupo con atención, y elija la frase de cada grupo que mejor describa cómo se ha sentido durante las últimas dos semanas, incluido el día de hoy.
                                Marque la casilla que está a la izquierda de la frase que ha elegido como respuesta a cada una de las afirmaciones del enunciado.
                            </StyledTypographyText>
                            <ButtonContainer>
                                <StyledButton variant="contained" onClick={handleContinue}>
                                    Adelante
                                </StyledButton>
                            </ButtonContainer>
                        </StyledBox>
                    </>
                ) : (
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
                                                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </QuestionWrapper>
                            ))}
                            <StyledButton variant="contained" disabled={!fin} onClick={handleSubmit}>Enviar</StyledButton>
                        </QuestionContainer>
                    </StyledPaperBDI >
                )}
            </CenteredContainer >
        </ThemeProvider >
    );
}


export default DeprFormBDI;