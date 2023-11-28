import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CenteredContainer,
    StyledBox,
    StyledTypographyText,
    ButtonContainer,
    Theme,
    StyledButton,
    StyledTypography2
} from '../../../../sharedStyles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';

const Image = styled('img')({
    width: '15%',
    height: '15%',
    margin: '1%',
    marginTop: '2%',
    marginBottom: '2%',
    border: '6px solid transparent',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        width: '17%',
        height: '17%',
    },
});

const allImages = [
    ['./ImagenesSesion9/MJ1.jpg', './ImagenesSesion9/MJ2.jpg', './ImagenesSesion9/MJ3.jpg', './ImagenesSesion9/MJ4.jpg'],
    ['./ImagenesSesion9/HB1.jpg', './ImagenesSesion9/HB2.jpg', './ImagenesSesion9/HB3.jpg', './ImagenesSesion9/HB4.jpg'],
    ['./ImagenesSesion9/NO1.jpg', './ImagenesSesion9/NO2.jpg', './ImagenesSesion9/NO3.jpg', './ImagenesSesion9/NO4.jpg']
];
const allAudios = ['./AudiosSesion9/MJ.mp3', './AudiosSesion9/HB.mp3', './AudiosSesion9/NO.mp3'];

const correctImages = [1, 1, 3];

const EstoyPresente = () => {
    //Variable de navegacion de router-dom
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;//Es obligatorio que este esto ya que si no se pone no podremos ver si hay una sesion activa

    const [idUsuario, setIdUsuario] = useState('');
    const [showIntro, setShowIntro] = useState(true);
    const [showImages, setShowImages] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [images, setImages] = useState(allImages[currentQuestionIndex]);
    const [audio, setAudio] = useState(allAudios[currentQuestionIndex]);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [selectedImageResponses, setSelectedImageResponses] = useState([]);
    const loadedImages = useRef(0);
    const audioRef = useRef(null);


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

        setShowIntro(false)
    };

    const handleImageLoad = () => {
        loadedImages.current += 1;
        if (loadedImages.current === images.length) {
            setAllImagesLoaded(true);
            setShowImages(true);
            setTimeout(() => { audioRef.current.play() }, 2000);
        }
    };

    const handlePlayAudio = () => {
        if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play();
        }
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);

        const isCorrect = index === correctImages[currentQuestionIndex];
        setSelectedImageResponses([...selectedImageResponses, isCorrect]);

        setTimeout(() => {
            setShowImages(false);
            setSelectedImageIndex(null);
        }, 1500);

        setTimeout(() => {

            if (currentQuestionIndex < allImages.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setImages(allImages[currentQuestionIndex + 1]);
                setAudio(allAudios[currentQuestionIndex + 1]);
            } else {

            }
        }, 3500);

        setTimeout(() => {
            setShowImages(true);
        }, 4100);

        setTimeout(() => {
            if (audioRef.current !== null) {
                audioRef.current.play();
            }
        }, 6300);

    };

    const handleEnd = () => {

        let datosSesion = '';

        const correctAnswers = (selectedImageResponses.filter((result) => result === true).length);

        switch (correctAnswers) {
            case 1:
                datosSesion = 'Sesión completada, ha acertado 1 imagen.';
                break;
            case 2:
                datosSesion = 'Sesión completada, ha acertado 2 imágenes.';
                break;
            case 3:
                datosSesion = 'Sesión completada, ha acertado todas las imágenes.';
                break;
            default:
                datosSesion = 'Sesión completada, no ha acertado ninguna imagen.';
                break;
        }

        Axios.post('http://localhost:3001/changeActiveSesion', {

            idUsuario: idUsuario,
            datosSesion: datosSesion,

        }).then((response) => {
            if (response.status === 200) {

                navigate('/logeadoUser');
            }
        });

    }


    const theme = Theme();
    return (
        <ThemeProvider theme={theme}>
            <CenteredContainer>
                {showIntro ? (
                    <>
                        <StyledBox>
                            <StyledTypographyText variant="h6" gutterBottom>
                                A continuación, te mostraré una serie de voces en las que tú deberás identificar y
                                relacionar con una serie de imágenes de personas.
                                Tu objetivo es descubrir a qué persona pertenece la voz del audio,
                                teniendo en cuenta sus emociones, tono de voz, género… ¡Lo vas a hacer genial!
                            </StyledTypographyText>
                            <ButtonContainer>
                                <StyledButton variant="contained" onClick={handleContinue}>
                                    Adelante
                                </StyledButton>
                            </ButtonContainer>
                        </StyledBox>
                    </>
                ) : currentQuestionIndex < allImages.length ? (

                    <>
                        <StyledTypography2 variant="h4" gutterBottom>
                            Elige la foto correspondiente a la voz que escuchas
                        </StyledTypography2>
                        <Fade in={showImages && allImagesLoaded} timeout={2700}>
                            <Box>
                                <Stack direction="row" justifyContent="center">
                                    {images.map((imageSrc, index) => (
                                        <Image
                                            key={index}
                                            src={imageSrc}
                                            onLoad={handleImageLoad}
                                            onClick={() => handleImageClick(index)}
                                            style={{
                                                borderColor: selectedImageIndex === index ? index === correctImages[currentQuestionIndex] ? 'lime' : 'red' : 'transparent',
                                            }}
                                        />
                                    ))}
                                </Stack>

                                <ButtonContainer>
                                    <StyledButton variant="contained" onClick={handlePlayAudio}>
                                        Play audio
                                    </StyledButton>
                                </ButtonContainer>
                            </Box>
                        </Fade>

                        <audio ref={audioRef} src={audio} />

                    </>

                ) : (
                    <>
                        <StyledBox>
                            <StyledTypographyText variant="h6" gutterBottom>
                                Genial, ya hemos terminado la sesión. Estoy segura de que has sabido prestar atención a las personas que han salido.
                                Esto es muy importante en el día a día, porque puede mejorar nuestro ánimo y nuestras relaciones con los demás.
                                En la siguiente sesión explicaré algunas técnicas más para mejorar nuestras habilidades sociales
                                y, en consecuencia, nuestras relaciones con los demás, para que nos sintamos mejor y sean más satisfactorias.
                                No puedo esperar a verte de nuevo. ¡Nos vemos pronto!
                            </StyledTypographyText>
                            <ButtonContainer>
                                <StyledButton variant="contained" onClick={handleEnd}>
                                    ¡Hasta pronto!
                                </StyledButton>
                            </ButtonContainer>
                        </StyledBox>

                    </>
                )}

            </CenteredContainer>
        </ThemeProvider >
    );
};

export default EstoyPresente;
