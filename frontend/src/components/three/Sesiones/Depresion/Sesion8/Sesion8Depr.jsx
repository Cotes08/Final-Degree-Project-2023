/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Text, RoundedBox, Html } from '@react-three/drei';
import Axios from 'axios';

/* Esta es la sesion 4.5 y le corresponde el audio sesion5 */
export function Sesion8Depr({ color, PlayerApi, idUsuario, updateSesionActiva, setShowSesion8Depr, posicionPizarra }) {

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

            if (newIndex === 5) {
                setAudioSesion(document.getElementById('audioSesion8Depr'));
                setShowAudio(true);
            } else if (newIndex === 7) {

                Axios.post('http://localhost:3001/changeActiveSesion', {

                    idUsuario: idUsuario,

                }).then((response) => {
                    if (response.status === 200) {
                        updateSesionActiva();
                        setShowSesion8Depr(false);
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
                <audio id="audioSesion8Depr" src={'./AudioSesionesDepr/Sesion1y5.mp3'} />
            </Html>

            {showInfo === 0 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Bienvenido/a a la sesión 8 de depresión, la quinta sesión Mindfulness. Hoy te explicaremos un concepto que muy probablemente hayas experimentado en el trabajo,
                    en la escuela, con amigos/as o familiares… Vamos a hablar un poco sobre el estrés.
                </Text >


            ) : showInfo === 1 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.19} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    El estrés es una respuesta natural del cuerpo que surge cuando nos enfrentamos a algún evento que nos suponga un desafío.
                    A veces tener un poco de estrés nos beneficia porque nos prepara para estar más atentos, ágiles y preparados para afrontar
                    la situación (a esto se le llama Eustrés). Pero, en ocasiones, sentimos una cantidad de estrés desmesurada que, en vez de ayudarnos,
                    nos dificulta enfrentarnos a la situación porque nos ponemos nerviosos, nos sentimos enfadados, tristes...(a esto se le llama Distrés).
                </Text >


            ) : showInfo === 2 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Un ejemplo es cuando vamos a hacer un examen: es necesario sentir un poco de estrés (Eustrés) para estar más activos y atentos
                    a contestar las preguntas del examen, pero si estoy muy muy nervioso/a (distrés), lo que va a generar es que me quede en blanco
                    y no me salga bien el examen.
                </Text >


            ) : showInfo === 3 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Otro ejemplo es cómo el estrés puede afectarnos emocionalmente y, en consecuencia, en nuestras relaciones.
                    Por ejemplo, cuando tengo mucho estrés en la escuela (distrés) puede provocar que me sienta enfadado/a y
                    hable mal sin querer a mis amigos/as y, en consecuencia, que se enfaden conmigo.
                </Text >


            ) : showInfo === 4 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Por ello, aunque vivamos en un mundo en el que experimentar estrés es inevitable,
                    sí podemos evitar y manejar el estrés que sentimos de manera más efectiva.
                    Una técnica para manejar el estrés es mediante la meditación. A continuación, pasaremos a una sesión de meditación guiada.
                </Text >


            ) : showInfo === 5 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="center"
                >
                    Pulsa el botón play del tocadiscos para comenzar la sesión. Una vez finalizada vuelve a leer la pizarra
                    ¡Disfruta de la experiencia!
                </Text >


            ) : (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.19} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
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
