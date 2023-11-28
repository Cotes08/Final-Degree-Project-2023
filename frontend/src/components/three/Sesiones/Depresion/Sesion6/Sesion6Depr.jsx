/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Text, RoundedBox, Html } from '@react-three/drei';
import Axios from 'axios';

/* Esta es la sesion 4.3 y le corresponde el audio sesion3 */
export function Sesion6Depr({ color, PlayerApi, idUsuario, updateSesionActiva, setShowSesion6Depr, posicionPizarra }) {

    const playerPosition = useRef([0, 0, 0]);
    const [showInfo, setShowInfo] = useState(0);
    const [showAudio, setShowAudio] = useState(false);
    const [audioSesion, setAudioSesion] = useState(null);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioMuted, setAudioMuted] = useState(false);
    const [textoBoton, setTextoBoton] = useState('Siguiente');


    //Se ejecuta al hacer click a la pizarra
    const handleClickBotonPizarra = () => {

        const umbral = 5;

        //Obtenemos la posicion del jugador
        PlayerApi.position.subscribe((pos) => {
            playerPosition.current = pos;
        });

        //Calculamos la distancia entre el jugador y la pizarra
        const distancia = Math.sqrt(
            Math.pow(playerPosition.current[0] - posicionPizarra[0], 2) +
            Math.pow(playerPosition.current[1] - posicionPizarra[1], 2) +
            Math.pow(playerPosition.current[2] - posicionPizarra[2], 2)
        );

        if (distancia < umbral) {

            changeInfo();

        }
    };

    const changeInfo = () => {

        setShowInfo((prevIndex) => {
            const newIndex = prevIndex + 1;

            if (newIndex === 1) {
                setAudioSesion(document.getElementById('audioSesion6Depr'));
                setShowAudio(true);
            } else if (newIndex === 3) {

                Axios.post('http://localhost:3001/changeActiveSesion', {

                    idUsuario: idUsuario,

                }).then((response) => {
                    if (response.status === 200) {
                        updateSesionActiva();
                        setShowSesion6Depr(false);
                    }
                });

            }

            return newIndex;
        });
    }

    const togglePlayPause = () => {

        if (audioPlaying) {
            audioSesion.pause();
            setAudioPlaying(false);
        } else {
            audioSesion.play();
            setAudioPlaying(true);
        }
    };

    const toggleMute = () => {

        if (audioMuted) {
            audioSesion.volume = 1;
            setAudioMuted(false);
        } else {
            audioSesion.volume = 0;
            setAudioMuted(true);
        }
    };


    useEffect(() => {
        if (showAudio) {
            const handleAudioEnded = () => {
                changeInfo();
                setTextoBoton('¡Hasta pronto!');
                setShowAudio(false);
            }

            audioSesion.addEventListener('ended', handleAudioEnded);

            return () => {
                audioSesion.removeEventListener('ended', handleAudioEnded);
            }
        }
    }, [audioSesion, showAudio]);

    return (
        <>
            <Html>
                <audio id="audioSesion6Depr" src={'./AudioSesionesDepr/Sesion3y6.mp3'} /> 
            </Html>

            {showInfo === 0 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Bienvenido/a a la sesión 6 de depresión, la tercera sesión de Mindfulness. Como vimos en la sesión pasada, las personas tenemos pensamientos constantemente, pero algunos no nos hacen sentir bien.
                    En esta sesión te enseñaremos cómo identificar esos pensamientos, aceptarlos y dejarlos ir para centrar la atención en lo que realmente quieres”.
                </Text >


            ) : showInfo === 1 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="center"
                >
                    Pulsa el botón play del tocadiscos para comenzar la sesión. Una vez finalizada vuelve a leer la pizarra
                    ¡Disfruta de la experiencia!
                </Text >


            ) : (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Ya hemos finalizado la sesión. ¿Cómo te has sentido? ¿Has aprendido a dejar ir los pensamientos y centrar tu atención en el atardecer?
                    No te preocupes si te vienen muchos pensamientos y te ha costado dejarlos ir, es normal.
                    A veces tenemos pensamientos que nos hacen sentir tan mal que es difícil dejarlos ir.
                    En la siguiente sesión te explicaremos cómo identificar esos pensamientos que nos hacen sentir incómodos/as y evaluar si de verdad son útiles tenerlos.
                    ¡Hasta pronto!
                </Text >
            )}


            {!showAudio ? (
                <>
                    <group>
                        <mesh position={[-4.9, 1, -0.5]} rotation={[0, Math.PI / 2, 0]} onClick={handleClickBotonPizarra}>
                            <RoundedBox args={[2, 0.5, 0.2]} radius={0.1} smoothness={4}>
                                <meshBasicMaterial attach="material" color={color} />
                            </RoundedBox>
                        </mesh>
                    </group>
                    <Text position={[-4.79, 1, -0.5]} fontSize={0.3} color={'#000000'} rotation={[0, Math.PI / 2, 0]}>
                        {textoBoton}
                    </Text>
                </>
            ) : (
                <>
                    <group onClick={togglePlayPause}>
                        <mesh position={[2.8, 0.93, -3.75]} rotation={[0, Math.PI, 0]}>
                            <RoundedBox args={[0.2, 0.1, 0.08]} radius={0.04} smoothness={4}>
                                <meshBasicMaterial attach="material" color={'#c5c5c5'} />
                            </RoundedBox>
                        </mesh>
                        <Text position={[2.8, 0.93, -3.709]} fontSize={0.03} color={'#000000'}>
                            Play/Pause
                        </Text>
                    </group>

                    <group onClick={toggleMute}>
                        <mesh position={[3.191, 0.93, -3.75]} rotation={[0, Math.PI, 0]}>
                            <RoundedBox args={[0.2, 0.1, 0.08]} radius={0.04} smoothness={4}>
                                <meshBasicMaterial attach="material" color={'#c5c5c5'} />
                            </RoundedBox>
                        </mesh>
                        <Text position={[3.191, 0.93, -3.709]} fontSize={0.04} color={'#000000'}>
                            Mute
                        </Text>
                    </group>

                </>
            )}

        </>
    );
};
