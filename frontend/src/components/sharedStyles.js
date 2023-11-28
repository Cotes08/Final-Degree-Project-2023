import { useContext } from 'react';
import { styled, createTheme } from '@mui/material/styles';
import { Button, Radio, Box, Paper, Typography, TextField, FormControlLabel, TextareaAutosize } from '@mui/material';
import { keyframes } from '@emotion/react';
import { ProfileContext } from '../ProfileContext';




/* ESTILOS DEL COLOR*/
// Define los esquemas de color predefinidos
const aveilableColors = {
    Rosa: {
        colorFondoDegradado1: '#f8c6d1',
        colorFondoDegradado2: '#f3b6c4',
        colorFondoDegradado3: '#eda4b4',
        colorTitulos: '#974e5e',
        colorBotonFondo: '#ffe4ea',
        colorTextoBoton: '#d3758a',
        colorFondoBotonRellenado: '#b96477',
        colorTextoBotonRellenado: '#ffe6ec',
        colorFondo2: '#ed768c',
        colorBlanco: '#ffffff',
        colorNegro: '#000000'
    },
    Azul: {
        colorFondoDegradado1: '#c0d6f3',
        colorFondoDegradado2: '#aec6e6',
        colorFondoDegradado3: '#89a3c7',
        colorTitulos: '#263141',
        colorBotonFondo: '#e8f2ff',
        colorTextoBoton: '#52637b',
        colorFondoBotonRellenado: '#3e4f67',
        colorTextoBotonRellenado: '#e5f2ff',
        colorFondo2: '#48637d',
        colorBlanco: '#ffffff',
        colorNegro: '#000000'
    },
    Lila: {
        colorFondoDegradado1: '#e3bdf8',
        colorFondoDegradado2: '#cea6e1',
        colorFondoDegradado3: '#a67caf',
        colorTitulos: '#48374c',
        colorBotonFondo: '#f1ddfd',
        colorTextoBoton: '#916d99',
        colorFondoBotonRellenado: '#74597a',
        colorTextoBotonRellenado: '#f9defe',
        colorFondo2: '#9e6d9c',
        colorBlanco: '#ffffff',
        colorNegro: '#000000'
    },
    Verde: {
        colorFondoDegradado1: '#b1dfae',
        colorFondoDegradado2: '#94bd92',
        colorFondoDegradado3: '#769874',
        colorTitulos: '#243123',
        colorBotonFondo: '#e6ffe5',
        colorTextoBoton: '#486146',
        colorFondoBotonRellenado: '#314330',
        colorTextoBotonRellenado: '#dcffe5',
        colorFondo2: '#386143',
        colorBlanco: '#ffffff',
        colorNegro: '#000000'
    }
};



//Creamos un theme para los efectos de los cuestionarios (Eros y BDI-II)
export function Theme() {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    const theme = createTheme({
        palette: {
            primary: {
                main: selectedColor.colorTextoBoton,
            },
        },
    });

    return theme;
}








////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* ANIMACIONES CUESTIONARIOS */

//Creamos la variable de keyframe de transicion de opacidad (Depresion forms)
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

//Animacion de relleno de boton (Depresion forms)
const fillButton = keyframes`
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
`;

//Le ponemos animacion al texto para que aparezca por arriba (Depresion forms)
const fadeInFromTop = keyframes`
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

//Componente boton que controla la forma en la que aparece el boton (Depresion forms)
const FadeInButton = styled(Button)(() => {
    return {
        opacity: 0,  /* opacidad 0 */
        animation: `${fadeIn} 1s ease-in forwards`,
    };
});



/* ESTILOS DE LAS PAGINAS */

//Color del fondo y contenedor que engloba todo (Depresion forms, intro form, actividad gratificante)
export const CenteredContainer = styled('div')(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        backgroundImage: `linear-gradient(to bottom, ${selectedColor.colorFondoDegradado1}, ${selectedColor.colorFondoDegradado2}, ${selectedColor.colorFondoDegradado3})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    };
});



//Recuadro que cubre al texto con fundidio normal (Eros y BDI-II)
export const StyledBox = styled(Box)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        backgroundColor: selectedColor.colorFondo2,
        padding: 16,
        display: 'inline-block',
        borderRadius: 16,
        border: '3px solid white',
        maxWidth: '40%',
        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});


/* ESTILOS DE LOS TEXTOS */

//Le damos estilo al texto (Select form)
export const StyledTypography = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontSize: 40,
        fontFamily: 'Coolvetica',
        fontWeight: 'bold',
        maxWidth: '70%',
        marginTop: '-20%',
        marginBottom: 100,
        textAlign: 'center',
        animation: `${fadeInFromTop} 0.8s ease-in forwards` /* Animación de aparición desde arriba */
    };
});

//Titulo de la depresion con fundido desde arriba (Eros y BDI-II)

export const StyledTypographyTitle = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontFamily: 'Coolvetica',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 50,
        maxWidth: '40%',
        marginTop: '-5%',
        animation: `${fadeInFromTop} 0.8s ease-in forwards` /* Animación de aparición desde arriba */
    };
});

//Estilo de titulo 2 (EROS y BDI-II)
export const StyledTypographyTitle2 = styled(Typography)(() => {


    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontFamily: 'Coolvetica',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 50,
        maxWidth: '50%',
        textAlign: 'center',
        marginTop: '-5%',
        animation: `${fadeInFromTop} 0.6s ease-in forwards` /* Animación de aparición desde arriba */
    };
});


//Texto de la depresion con fundido normal(Eros y BDI-II)
export const StyledTypographyText = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        fontFamily: 'Coolvetica',
        fontSize: 25,
        textAlign: 'justify',
        animation: `${fadeIn} 0.8s ease-in forwards`,
        color: selectedColor.colorTextoBotonRellenado
    };
});






/* ESTILOS DE LOS BOTONES */

//Boton personalizado con la animcaicon de relleno y fundido (Eros y BDI-II)
export const StyledButton = styled(FadeInButton)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        fontFamily: 'Coolvetica',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: selectedColor.colorBotonFondo,
        color: selectedColor.colorTextoBoton,
        border: '3px',
        fontSize: 'larger',


        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 0,
            backgroundColor: selectedColor.colorFondoBotonRellenado,
            zIndex: -1,
            transition: 'width 0.3s ease-in-out'
        },

        '&:hover': {
            color: selectedColor.colorTextoBotonRellenado,
            backgroundColor: selectedColor.colorBotonFondo,

            '&::before': {
                animation: `${fillButton} 0.3s ease-in-out forwards`
            }
        }
    };
});

// Contenedor del botón (Eros y BDI-II)
export const ButtonContainer = styled('div')(() => {

    return {
        display: 'flex',
        justifyContent: 'center'
    };
});



/* ESTILOS ESPECIFICOS DE CADA CUESTIONARIO */

/*Select sesion*/
//Creamos un componente que se comportara como un div y tiene estilo (eSTE RECOGE LOS BOTONES)
export const ButtonContainerCustom = styled('div')(() => {

    return {
        display: 'flex',
        marginTop: '0.8%'
    };

});

//Componente boton que controla la forma en la que aparecen los botones
export const FadeInButtonCustom = styled(Button)(() => {

    return {
        opacity: 0,  /* opacidad 0 */
        animation: `${fadeIn} 1s ease-in forwards`, /* animación fadeIn 1 segundo, van apareciendo 1 a 1 */
        '&:nth-of-type(1)': {
            animationDelay: '0.8s' /* Aparece el btn 1 tras 0.8 */
        },
        '&:nth-of-type(2)': {
            animationDelay: '1.3s' /* Aparece el btn 1 tras 1.3 */
        },
        '&:nth-of-type(3)': {
            animationDelay: '1.8s' /* Aparece el btn 1 tras 1.8 */
        }
    };


});


//Creamos el componente de styled button que controla se crea a partir del fadebutton y le da estilo
/*ESTE SE USARA TAMBIEN POR EL BDI SOLO QUE NO PUEDO PONERLO ARRIBA POR LA DECLARACION*/
export const StyledButtonCustom = styled(FadeInButtonCustom)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        fontFamily: 'Coolvetica',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: selectedColor.colorBotonFondo,
        color: selectedColor.colorTextoBoton,
        border: '3 px',
        fontSize: 'larger',
        margin: '0 30px',

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 0,
            backgroundColor: selectedColor.colorFondoBotonRellenado,
            zIndex: -1,
            transition: 'width 0.3s ease-in-out'
        },

        '&:hover': {
            color: selectedColor.colorTextoBotonRellenado,
            backgroundColor: selectedColor.colorBotonFondo,

            '&::before': {
                animation: `${fillButton} 0.3s ease-in-out forwards` /* Ponemos la animación de relleno */
            }
        }
    };


});



/* EROS */
//Contenedor de los botones radio
export const RadioGroupContainer = styled('div')(() => {


    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 16,
        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});

//Los porpias botones radio
export const ModRadio = styled(Radio)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        '& .MuiSvgIcon-root': {
            fontSize: '2rem'
        },
        '&.Mui-checked': {
            color: selectedColor.colorFondo2
        }
    };


});



//Texto conjunto a los botones radio
export const BoldText = styled('span')(() => {
    return {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        margin: '0 5%',
        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});


//Pregunta
export const QuestionHeading = styled('h2')(() => {
    return {
        textAlign: 'center',
        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});

//Recuadro que cubre la preguntas
export const StyledPaperEros = styled(Paper)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        backgroundColor: selectedColor.colorBlanco,
        margin: 16,
        padding: 16,
        width: '65%',
        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});








/* BDI-II */
export const QuestionContainer = styled(Box)(() => {

    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    };
});


export const QuestionWrapper = styled(Box)(() => {

    return {
        margin: '2% 0 5% 0'
    };

    /* margin-top: 2%;
    margin-bottom: 5%; */
});



//Recuadro que cubre la preguntas
export const StyledPaperBDI = styled(Paper)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        backgroundColor: selectedColor.colorBlanco,
        borderRadius: '10px',
        padding: '0.63%',
        width: '40%',
        height: '80%',
        overflowY: 'scroll',

        '&::-webkit-scrollbar': {
            width: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#aaa',
            borderRadius: '4px'
        },

        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* ESTILOS DEL INTRO FORM */

export const IntroFormContainer = styled('div')(() => {

    return {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10%',

        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});


export const QuestionsContainer = styled('div')(() => {

    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});


export const StyledTypographyTitleIntro = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontFamily: 'Coolvetica',
        fontSize: 45,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        animation: `${fadeInFromTop} 0.6s ease-in forwards` /* Animación de aparición desde arriba */
    };
});



export const QuestionContainerIntro = styled('div')(() => {

    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
});


export const InputFieldIntro = styled(TextField)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        backgroundColor: '#ffffff',
        borderRadius: '5px',


        '& .MuiInputBase-input': {
            width: '100%',
            padding: '10px',
            marginRight: '10px',
            fontSize: '20px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${selectedColor.colorTitulos}`,
        }
    }
});


export const StyledButtonIntro = styled(FadeInButton)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];


    return {
        fontFamily: 'Coolvetica',
        backgroundColor: selectedColor.colorBotonFondo,
        color: selectedColor.colorTextoBoton,
        border: '3px',
        overflow: 'hidden',
        fontSize: 20,
        padding: '8px 16px',
        margin: '10px',


        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 0,
            backgroundColor: selectedColor.colorFondoBotonRellenado,
            zIndex: -1,
            transition: 'width 0.3s ease-in-out'
        },

        '&:hover': {
            color: selectedColor.colorTextoBotonRellenado,
            backgroundColor: selectedColor.colorBotonFondo,

            '&::before': {
                animation: `${fillButton} 0.3s ease-in-out forwards`
            }
        }
    };
});





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Estilos actividadGratificante

export const BoxActividadGartificante = styled(Box)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        backgroundColor: selectedColor.colorBlanco,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderRadius: 50,
        padding: 40,
        marginBottom: '-18%',
        marginTop: '-1%',
        overflow: 'auto',
        maxWidth: '60%',
        maxHeight: '80%',
        minWidth: '15%',
        animation: `${fadeIn} 0.8s ease-in forwards`
    };
});


export const TextFieldActividadGartificante = ((props) => {

    return (
        <TextField
            variant="outlined"
            size="medium"
            sx={{ my: 1, minWidth: 400 }}
            inputProps={{ maxLength: 95 }}
            {...props}

        />
    );
});

export const StyledTextActividad = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontSize: 26,
        fontFamily: 'Coolvetica',
        fontWeight: 'bold',
        marginTop: "-18%",
        marginBottom: "5%",
        textAlign: 'justify',
        maxWidth: "50%",
        animation: `${fadeInFromTop} 0.8s ease-in forwards` /* Animación de aparición desde arriba */
    };
});

export const StyledFormControl = styled(FormControlLabel)(() => {

    return {
        '& .MuiFormControlLabel-label': {
            fontSize: 20,
        },
    }
});

export const StyledButtonActividades = styled(FadeInButton)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        fontFamily: 'Coolvetica',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: selectedColor.colorBotonFondo,
        color: selectedColor.colorTextoBoton,
        border: '3px',
        fontSize: 'larger',
        marginTop: '5%',


        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 0,
            backgroundColor: selectedColor.colorFondoBotonRellenado,
            zIndex: -1,
            transition: 'width 0.3s ease-in-out'
        },

        '&:hover': {
            color: selectedColor.colorTextoBotonRellenado,
            backgroundColor: selectedColor.colorBotonFondo,

            '&::before': {
                animation: `${fillButton} 0.3s ease-in-out forwards`
            }
        }
    };
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Estilos Pensamientos Automáticos


export const StyledTypographyTitlePensAuto = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontFamily: 'Coolvetica',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 50,
        maxWidth: '40%',
        marginTop: '-5%',
    };
});


export const StyledTextPensAuto = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontSize: 26,
        fontFamily: 'Coolvetica',
        fontWeight: 'bold',
        marginTop: "3%",
        textAlign: 'justify',
        maxWidth: "50%",
    };
});


export const StyledTextPensAuto2 = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontSize: 26,
        fontFamily: 'Coolvetica',
        fontWeight: 'bold',
        marginTop: "-5%",
        marginBottom: "2%",
        textAlign: 'justify',
        maxWidth: "50%",
        animation: `${fadeInFromTop} 0.8s ease-in forwards` /* Animación de aparición desde arriba */
    };
});


export const StyledButtonPensAuto = styled(FadeInButton)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        fontFamily: 'Coolvetica',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: selectedColor.colorBotonFondo,
        color: selectedColor.colorTextoBoton,
        border: '3px',
        fontSize: 'larger',
        marginTop: '5%',


        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 0,
            backgroundColor: selectedColor.colorFondoBotonRellenado,
            zIndex: -1,
            transition: 'width 0.3s ease-in-out'
        },

        '&:hover': {
            color: selectedColor.colorTextoBotonRellenado,
            backgroundColor: selectedColor.colorBotonFondo,

            '&::before': {
                animation: `${fillButton} 0.3s ease-in-out forwards`
            }
        }
    };
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Estilos Piloto automatico

export const CenteredTextArea = styled('div')({
    display: 'block',
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
})

export const StyledTextArea = styled(TextareaAutosize)({
    borderRadius: 8,
    backgroundColor: 'white',
    width: '100%',
    maxHeight: 200,
    padding: 8,
    boxSizing: 'border-box',
    resize: 'none',
    overflow: 'auto',
    '&:focus': {
        outline: '2px solid white',
    },
});



export const StyledTypography2 = styled(Typography)(() => {

    const { color } = useContext(ProfileContext);
    const selectedColor = aveilableColors[color];

    return {
        color: selectedColor.colorTitulos,
        fontSize: 40,
        fontFamily: 'Coolvetica',
        fontWeight: 'bold',
        maxWidth: '70%',
        marginTop: '-10%',
        marginBottom: 100,
        textAlign: 'center',
        animation: `${fadeInFromTop} 0.8s ease-in forwards` /* Animación de aparición desde arriba */
    };
});