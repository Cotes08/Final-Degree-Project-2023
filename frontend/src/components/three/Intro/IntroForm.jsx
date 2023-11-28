import React, { Fragment, useState, useRef, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  
    CenteredContainer,
    IntroFormContainer,
    QuestionsContainer,
    StyledTypographyTitleIntro,
    QuestionContainerIntro,
    InputFieldIntro,
    StyledButtonIntro
} from '../../sharedStyles';




const IntroForm = ({ setShowIntro, idUsuario }) => {
    const [numPreguntas, setNumPreguntas] = useState(0);
    const [completado, setCompletado] = useState(false);
    const [input, setInput] = useState({});
    const [inputValido, setInputValido] = useState(false);
    const transitionRef = useRef(null);


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
        });
    });

    //Array con la psobles preguntas
    const preguntas = [
        {
            tipo: "input",
            pregunta: "¿Cómo prefieres que te llame durante la experiencia?",
        },
        {
            tipo: "multiple",
            pregunta: "¿Cuál es tu género?",
            opciones: ["Masculino", "Femenino", "Otro"],
        },
        {
            tipo: "input",
            pregunta: "¿Cuál es tu disponibilidad para la experiencia?",
        },
        {
            tipo: "multiple",
            pregunta: "¿Qué tonos de color prefieres?",
            opciones: ["Rosa", "Azul", "Lila", "Verde"],
        },
    ];

    //Al pasar se pregunta se comprueba si es multiple, en el caso de que lo sea se guarda
    //Tambien pasa la pregunta
    const siguientePregunta = (opcion) => {
        if (preguntas[numPreguntas].tipo === "multiple") {
            setInput((prevState) => ({
                ...prevState,
                [preguntas[numPreguntas].pregunta]: opcion,
            }));
            setInputValido(true);
        }

        if (numPreguntas < preguntas.length - 1) {
            setNumPreguntas(numPreguntas + 1);
            setInputValido(false);
        } else {
            setCompletado(true);
        }
    };

    //Va guardadndo el input que se vaya exribiendo
    const guardarInput = (e) => {
        const valorInput = e.target.value;
        setInput((prevState) => ({
            ...prevState,
            [preguntas[numPreguntas].pregunta]: valorInput,
        }));

        setInputValido(valorInput.trim() !== "");
    };

    //Se suben las preguntas al acabar ek formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const inputValues = Object.values(input);

        Axios.post('http://localhost:3001/newPerfilUsr', {
            idUsuario: idUsuario,
            apodo: inputValues[0],
            genero: inputValues[1],
            disponibilidad: inputValues[2],
            color: inputValues[3],
        });

        //Ponemos el show intro a false
        setShowIntro(false);
    };

    return (
        <Fragment>
            <CenteredContainer>
                {/* <form onSubmit={handleSubmit}> */}
                <IntroFormContainer>
                    {!completado && (
                        <QuestionsContainer ref={transitionRef}>
                            <StyledTypographyTitleIntro gutterBottom>{preguntas[numPreguntas].pregunta}</StyledTypographyTitleIntro>
                            {preguntas[numPreguntas].tipo === "multiple" ? (
                                <QuestionContainerIntro>
                                    {preguntas[numPreguntas].opciones.map((opcion) => {
                                        return (
                                            <StyledButtonIntro
                                                key={opcion}
                                                onClick={() => siguientePregunta(opcion)}
                                            >
                                                {opcion}
                                            </StyledButtonIntro>
                                        );
                                    })}
                                </QuestionContainerIntro>
                            ) : (
                                <QuestionContainerIntro>
                                    <InputFieldIntro
                                        type="text"
                                        value={input[preguntas[numPreguntas].pregunta] || ""}
                                        onChange={guardarInput}
                                        
                                    />
                                    <StyledButtonIntro 
                                        onClick={siguientePregunta}
                                        disabled={!inputValido}
                                    >
                                        Siguiente
                                    </StyledButtonIntro>
                                </QuestionContainerIntro>
                            )}
                        </QuestionsContainer>
                    )}
                    {completado && (
                        <QuestionsContainer>
                            <StyledTypographyTitleIntro>¡Ya está todo listo! Haz click en el botón para comenzar la experiencia.</StyledTypographyTitleIntro>
                            <StyledButtonIntro onClick={handleSubmit}>
                                Empezar
                            </StyledButtonIntro>
                        </QuestionsContainer>
                    )}
                </IntroFormContainer>
                {/* </form> */}
            </CenteredContainer>
        </Fragment>
    );
};

export default IntroForm;