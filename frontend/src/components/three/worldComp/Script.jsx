/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Suspense, useContext, useMemo } from "react";
import { ProfileContext } from '../../../ProfileContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Canvas } from "@react-three/fiber";
import { Sky, PointerLockControls, Stars, Environment } from "@react-three/drei";
import { Physics, Debug } from "@react-three/cannon";
import { Ground } from "./Ground";
import { Player } from "./Player";
import { Casa } from "./Casa";
import { Entorno } from "./Entorno";
import { Mascota } from "./Mascota";
import { Pizarra } from "./Pizarra";
import { ModeloTV } from './ModeloTV';
import { Loader } from "./Loader";
import { Bocadillo } from "./Bocadillo";
import { Mesa } from "./Mesa";
import { Tocadiscos } from "./Tocadiscos";
import { Portatil } from "./Portatil";
import { Sesion1Depr } from "../Sesiones/Depresion/Sesion1/Sesion1Depr";
import { Sesion2Depr } from "../Sesiones/Depresion/Sesion2/Sesion2Depr";
import { Sesion3Depr } from "../Sesiones/Depresion/Sesion3/Sesion3Depr";
import { Sesion4Depr } from "../Sesiones/Depresion/Sesion4/Sesion4Depr";
import { Sesion5Depr } from "../Sesiones/Depresion/Sesion5/Sesion5Depr";
import { Sesion6Depr } from "../Sesiones/Depresion/Sesion6/Sesion6Depr";
import { Sesion7Depr } from "../Sesiones/Depresion/Sesion7/Sesion7Depr";
import { Sesion8Depr } from "../Sesiones/Depresion/Sesion8/Sesion8Depr";
import { Sesion9Depr } from "../Sesiones/Depresion/Sesion9/Sesion9Depr";
import { Sesion10Depr } from "../Sesiones/Depresion/Sesion10/Sesion10Depr";
import { Sesion11Depr } from "../Sesiones/Depresion/Sesion11/Sesion11Depr";



//Lista de cancions
let controlMusica = true;
let audio = document.getElementById("audio");

function Script({ idUsuario, songs, currentSongIndex, setCurrentSongIndex }) {

    if (audio === null) {
        audio = document.getElementById("audio");
    }

    const [PlayerApi, setPlayerApi] = useState(null);
    const [nextSong, setNextSong] = useState(0);
    const [sesionActiva, setSesionActiva] = useState('');
    const [posicionPizarra] = useState([-5, 1.8, -0.5]);
    const [controlsEnabled, setControlsEnabled] = useState(true);
    const [showSesion1Depr, setShowSesion1Depr] = useState(false);
    const [showSesion2Depr, setShowSesion2Depr] = useState(false);
    const [showSesion3Depr, setShowSesion3Depr] = useState(false);
    const [showSesion4Depr, setShowSesion4Depr] = useState(false);
    const [showSesion5Depr, setShowSesion5Depr] = useState(false);
    const [showSesion6Depr, setShowSesion6Depr] = useState(false);
    const [showSesion7Depr, setShowSesion7Depr] = useState(false);
    const [showSesion8Depr, setShowSesion8Depr] = useState(false);
    const [showSesion9Depr, setShowSesion9Depr] = useState(false);
    const [showSesion10Depr, setShowSesion10Depr] = useState(false);
    const [showSesion11Depr, setShowSesion11Depr] = useState(false);
    const { color, setColor } = useContext(ProfileContext);
    const { setApodo } = useContext(ProfileContext);


    //Variable de navegacion de router-dom
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;//Es obligatorio que este esto ya que si no se pone no podremos ver si hay una sesion activa


    //Comprobamos si el usuario tiene una sesion activa
    useEffect(() => {
        if (idUsuario !== '') {
            Axios.post('http://localhost:3001/checkSesionActiva', {

                idUsuario: idUsuario

            }).then((response) => {

                setSesionActiva(response.data);

                Axios.post('http://localhost:3001/getDataPerfil', {

                    idUsuario: idUsuario

                }).then((response) => {

                    if (response.data.length !== 0) {
                        setColor(response.data[0].color);
                        setApodo(response.data[0].apodo);
                        controlMusica = true;
                    }    
                });

            });
        }
    }, [idUsuario]);

    const updateSesionActiva = () => {

        controlMusica = true;

        Axios.post('http://localhost:3001/checkSesionActiva', {
            idUsuario: idUsuario,
        }).then((response) => {
            setSesionActiva(response.data);
        });

        if (audio != null) {
            audio.play();
            audio.volume = 0.05;
        }
    }

    //Funcion para obtener la posicion del jugador
    const handlePlayerApi = (api) => {
        setPlayerApi(api);
    };

    //Funcion para reproducir la cancion
    const handleLock = () => {
        setControlsEnabled(true);
        if (audio != null) {
            if (controlMusica) {
                audio.volume = 0.05;
                audio.play();
            }
        } else {
            audio = document.getElementById("audio");
            if (controlMusica) {
                audio.volume = 0.05;
                audio.play();
            }
        }
    };

    //Funcion para pausar la cancion y el menu de pausa
    const handleUnlock = () => {
        setControlsEnabled(false);
        if (audio != null) {
            if (controlMusica) {
                audio.volume = 0.05;
                audio.pause();
            }
        } else {
            audio = document.getElementById("audio");
            if (controlMusica) {
                audio.volume = 0.05;
                audio.play();
            }
        }
    };


    //Funcion para cambiar de cancion
    const changeSong = () => {
        if (audio != null) {
            console.log(audio);
            audio.pause();
            if (currentSongIndex === songs.length - 1) {
                setCurrentSongIndex(0);
            } else {
                setCurrentSongIndex(currentSongIndex + 1);
            };

            if (audio) {
                audio.addEventListener("canplaythrough", () => {
                    audio.play();
                });
            };

        }
    };

    //Funcion para controlar el cambio de cancion desde algun componente
    const controlNextSong = (nextSong) => {
        setNextSong(nextSong);
    };

    //Si hay un cambio en nextSong(es decir que el usuario ha interactuado) 
    useEffect(() => {
        if (nextSong) {
            changeSong();
            setNextSong(false);
        }
    }, [nextSong]);


    //Si el usuario tiene una sesion activa, se le redirige a la sesion activa, si no tiene sesion activa se le redirige a la seleccion de sesion
    const handleSelectSesion = (selectSesion) => {
        if (selectSesion === true) {
            if (audio) {
                controlMusica = false;
                audio.pause();
            }
            if (sesionActiva.SesionActiva) {
                switch (sesionActiva.idSesion) {
                    case 1:
                        setShowSesion1Depr(true);
                        break;
                    case 2:
                        setShowSesion2Depr(true);
                        break;
                    case 3:
                        setShowSesion3Depr(true);
                        break;
                    case 4:
                        setShowSesion4Depr(true);
                        break;
                    case 5:
                        setShowSesion5Depr(true);
                        break;
                    case 6:
                        setShowSesion6Depr(true);
                        break;
                    case 7:
                        setShowSesion7Depr(true);
                        break;
                    case 8:
                        setShowSesion8Depr(true);
                        break;
                    case 9:
                        setShowSesion9Depr(true);
                        break;
                    case 10:
                        setShowSesion10Depr(true);
                        break;
                    case 11:
                        setShowSesion11Depr(true);
                        break;
                    default:

                        break;
                }
            } else {
                navigate('/selectSesion');
            }
        }
    }

    const getColor = (color) => {
        switch (color) {
            case 'Rosa':
                return '#ffa5b6';
            case 'Azul':
                return '#7ea5ca';
            case 'Verde':
                return '#659973';
            case 'Lila':
                return '#b57db2';
            default:
                return '#ffa5b6';
        }
    };

    const entorno = useMemo(() => <Entorno />, []);

    return (
        <>
            <Canvas>
                <Suspense fallback={<Loader />}>
                    <Sky sunPosition={[100, 80, 10]} />
                    <Stars radius={100} depth={50} count={100} factor={7} saturation={0} fade speed={0.1} />
                    <Environment files="sunrise.hdr" background />
                    <PointerLockControls onLock={handleLock} onUnlock={handleUnlock} />
                    <Physics>
                        {/* <Debug color="black" scale={1.0}> */}
                            <Ground />
                            <Casa colorCasa={getColor(color)} PlayerApi={PlayerApi}/>
                            {entorno}
                            <Mascota PlayerApi={PlayerApi} handleSelectSesion={handleSelectSesion} />
                            <Player handlePlayerApi={handlePlayerApi} controlsEnabled={controlsEnabled} />
                            <Bocadillo sesionActiva={sesionActiva} />
                            <Pizarra posicionPizarra={posicionPizarra} />
                            <ModeloTV />
                            <Mesa />
                            <Portatil color={getColor(color)} PlayerApi={PlayerApi} />
                            <Tocadiscos color={getColor(color)} PlayerApi={PlayerApi} controlMusica={controlMusica} controlNextSong={controlNextSong} />
                            {showSesion1Depr && <Sesion1Depr color={getColor(color)} PlayerApi={PlayerApi} idUsuario={idUsuario} updateSesionActiva={updateSesionActiva} setShowSesion1Depr={setShowSesion1Depr} posicionPizarra={posicionPizarra} />}
                            {showSesion2Depr && <Sesion2Depr color={getColor(color)} PlayerApi={PlayerApi} posicionPizarra={posicionPizarra} />}
                            {showSesion3Depr && <Sesion3Depr color={getColor(color)} PlayerApi={PlayerApi} idUsuario={idUsuario} updateSesionActiva={updateSesionActiva} setShowSesion3Depr={setShowSesion3Depr} posicionPizarra={posicionPizarra} />}
                            {showSesion4Depr && <Sesion4Depr color={getColor(color)} PlayerApi={PlayerApi} idUsuario={idUsuario} updateSesionActiva={updateSesionActiva} setShowSesion4Depr={setShowSesion4Depr} posicionPizarra={posicionPizarra} />}
                            {showSesion5Depr && <Sesion5Depr color={getColor(color)} PlayerApi={PlayerApi} posicionPizarra={posicionPizarra} />}
                            {showSesion6Depr && <Sesion6Depr color={getColor(color)} PlayerApi={PlayerApi} idUsuario={idUsuario} updateSesionActiva={updateSesionActiva} setShowSesion6Depr={setShowSesion6Depr} posicionPizarra={posicionPizarra} />}
                            {showSesion7Depr && <Sesion7Depr color={getColor(color)} PlayerApi={PlayerApi} posicionPizarra={posicionPizarra} />}
                            {showSesion8Depr && <Sesion8Depr color={getColor(color)} PlayerApi={PlayerApi} idUsuario={idUsuario} updateSesionActiva={updateSesionActiva} setShowSesion8Depr={setShowSesion8Depr} posicionPizarra={posicionPizarra} />}
                            {showSesion9Depr && <Sesion9Depr color={getColor(color)} PlayerApi={PlayerApi} posicionPizarra={posicionPizarra} />}
                            {showSesion10Depr && <Sesion10Depr color={getColor(color)} PlayerApi={PlayerApi} idUsuario={idUsuario} updateSesionActiva={updateSesionActiva} setShowSesion10Depr={setShowSesion10Depr} posicionPizarra={posicionPizarra} />}
                            {showSesion11Depr && <Sesion11Depr color={getColor(color)} PlayerApi={PlayerApi} idUsuario={idUsuario} updateSesionActiva={updateSesionActiva} setShowSesion11Depr={setShowSesion11Depr} posicionPizarra={posicionPizarra} />}
                        {/* </Debug> */}
                    </Physics>
                </Suspense>
            </Canvas >
            <div className="dot" />
        </>
    );
}

export default Script;

//Music by <a href="https://pixabay.com/users/relaxingtime-17430502/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=141198">RelaxingTime</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=141198">Pixabay</a>
//Music by <a href="https://pixabay.com/users/innertune-33137231/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=137153">InnerTune</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=137153">Pixabay</a>
//Music by <a href="https://pixabay.com/users/teodholina-32752748/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=141317">teodholina</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=141317">Pixabay</a>