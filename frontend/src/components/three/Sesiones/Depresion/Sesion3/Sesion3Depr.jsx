import React, { useState, useRef, useEffect } from "react";
import { Text, RoundedBox } from "@react-three/drei";
import ulrVideoRelajacion from './video/RelajaciónMuscularProgresivadeJacobson.mp4';
import Axios from 'axios';


export function Sesion3Depr({ color, PlayerApi, idUsuario, updateSesionActiva, setShowSesion3Depr, posicionPizarra }) {

    const [showVideo, setShowVideo] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const playerPosition = useRef([0, 0, 0]);
    const [videoPlaying, setVideoPlaying] = useState(true);
    const [videoMuted, setVideoMuted] = useState(false);
    const [video] = useState(() => {
        const vid = document.createElement('video');
        vid.src = ulrVideoRelajacion;
        vid.crossOrigin = 'Anonymous';
        vid.loop = false;
        vid.volume = 0.5;
        return vid;
    });

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
            if (showInfo) {
                setShowInfo(false);
                setShowVideo(true);
            }

        }
    };

    const togglePlayPause = () => {

        video.volume = 0.2;

        if (videoPlaying) {
            video.pause();
            setVideoPlaying(false);
        } else {
            video.play();
            setVideoPlaying(true);
        }
    };

    const toggleMute = () => {

        if (videoMuted) {
            video.muted = false;
            setVideoMuted(false);
        } else {
            video.muted = true;
            setVideoMuted(true);
        }
    };


    useEffect(() => {
        const handleVideoEnd = () => {
            Axios.post('http://localhost:3001/changeActiveSesion', {

                idUsuario: idUsuario,

            }).then((response) => {
                if (response.status === 200) {
                    updateSesionActiva();
                    setShowSesion3Depr(false);
                }
            });
        };

        video.addEventListener('ended', handleVideoEnd);

        return () => {
            video.removeEventListener('ended', handleVideoEnd);
        };
    }, [video, idUsuario, updateSesionActiva, setShowSesion3Depr]);

    return (

        <>
            {showInfo ? (
                <>
                    <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                        textAlign="justify" 
                    >
                        En esta sesión, te pediré que te sientes en una silla y cierres los ojos mientras escuchas un video de fondo.
                        El video incluirá una serie de instrucciones sobre cómo contraer y relajar diferentes músculos de tu cuerpo.
                    </Text>

                    <group>
                        <mesh position={[-4.9, 1, -0.5]} rotation={[0, Math.PI / 2, 0]} onClick={handleClickBotonPizarra}>
                            <RoundedBox args={[2, 0.5, 0.2]} radius={0.1} smoothness={4}>
                                <meshBasicMaterial attach="material" color={color} />
                            </RoundedBox>
                        </mesh>
                    </group>
                    <Text position={[-4.79, 1, -0.5]} fontSize={0.3} color={'#000000'} rotation={[0, Math.PI / 2, 0]}>
                        ¡Vamos allá!
                    </Text>
                </>

            ) : (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Pulsa el botón play del televisor para comenzar la sesión.
                    ¡Disfruta de la experiencia!
                </Text >
            )}

            {/* Video de relajacion */}
            {showVideo && (
                <>

                    <group onClick={togglePlayPause}>
                        <mesh position={[5.84, 0.385, -1.1]} rotation={[0, Math.PI / 2, 0]}>
                            <RoundedBox args={[0.42, 0.155, 0.08]} radius={0.04} smoothness={4}>
                                <meshBasicMaterial attach="material" color={'#383838'} />
                            </RoundedBox>
                        </mesh>
                        <Text position={[5.799, 0.39, -1.1]} fontSize={0.07} color={'#bcbcbc'} rotation={[0, -Math.PI / 2, 0]}>
                            Play/Pause
                        </Text>
                    </group>

                    <group onClick={toggleMute}>
                        <mesh position={[5.84, 0.385, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <RoundedBox args={[0.42, 0.155, 0.08]} radius={0.04} smoothness={4}>
                                <meshBasicMaterial attach="material" color={'#383838'} />
                            </RoundedBox>
                        </mesh>
                        <Text position={[5.799, 0.39, 0]} fontSize={0.07} color={'#bcbcbc'} rotation={[0, -Math.PI / 2, 0]}>
                            Mute
                        </Text>
                    </group>


                    {/* VIDEO */}
                    <mesh position={[5.9, 1.85, -0.58]} rotation={[0, -Math.PI / 2, 0]}>
                        <planeGeometry args={[5.16, 2.75]} />
                        <meshStandardMaterial>
                            <videoTexture attach="map" args={[video]} />
                        </meshStandardMaterial>
                    </mesh>

                </>
            )}
        </>
    );
};


/* Video de David Sánchez psicología https://www.youtube.com/watch?v=eu-2iWv_fCM */