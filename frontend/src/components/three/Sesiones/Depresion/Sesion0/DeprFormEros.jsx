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
    BoldText,
    ModRadio,
    StyledButton,
    StyledButtonCustom
} from '../../../../sharedStyles';



const DeprFormEros = () => {
    const [questions, setQuestions] = useState([]);
    const [idQuestions, setIdQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showIntro, setShowIntro] = useState(false);
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


    const handleContinue = () => {
        if (!showIntro) {
            Axios.post('http://localhost:3001/checkSesionActiva', {

                idUsuario: idUsuario

            }).then((response) => {

                Axios.post('http://localhost:3001/getPreguntasDepresion', {

                    idSesion: response.data.idSesion,
                    cuestionario: 'EROS'

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

        Axios.post('http://localhost:3001/subirAnswersForm', {

            idUsuario: idUsuario,
            respuestas: selectedOptions,
            idPregunta: idQuestions,
        });

        navigate('/logeadoUser');
    };



    const theme = Theme();

    return (
        <ThemeProvider theme={theme}>
            <CenteredContainer>
                {!showIntro ? (
                    <>
                        <StyledTypographyTitle2 variant="h4" gutterBottom>
                            ¡Bien hecho! ya casi hemos acabado.
                        </StyledTypographyTitle2>
                        <StyledBox>
                            <StyledTypographyText variant="h6" gutterBottom>
                                Ahora para conocerte un poco más y crear una experiencia más a tu medida, me gustaría hacerte algunas preguntas. Te diré unas frases y me dirás cuánto de acuerdo estás con éstas, siendo totalmente de acuerdo un 4 y totalmente en desacuerdo un 1.
                            </StyledTypographyText>
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
                                <BoldText>Totalmente en desacuerdo</BoldText>
                                <RadioGroup row value={selectedOption} onChange={handleOptionChange}>
                                    {[1, 2, 3, 4].map((option) => (
                                        <FormControlLabel key={option} value={option} control={<ModRadio />} label={`${option}`} />
                                    ))}
                                </RadioGroup>
                                <BoldText>Totalmente de acuerdo</BoldText>
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
                        <StyledTypographyTitle2 variant="h4" gutterBottom>
                            ¡Ya esta todo listo! Gracias por tu colaboración.
                        </StyledTypographyTitle2>
                        <ButtonContainer>
                            <StyledButtonCustom variant="contained" onClick={handleSubmit}>Continuar</StyledButtonCustom>
                        </ButtonContainer>
                    </>
                )}
            </CenteredContainer>
        </ThemeProvider>
    );
};

export default DeprFormEros;