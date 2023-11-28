import React, { useState, useRef } from "react";
import { Text, RoundedBox } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';


export function Sesion2Depr({ color, PlayerApi, posicionPizarra }) {

    const [showInfo, setShowInfo] = useState(true);
    const [textoBoton, setTextoBoton] = useState('Siguiente');
    const playerPosition = useRef([0, 0, 0]);
    const navigate = useNavigate();


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

            if (showInfo === false) {

                navigate('/ActividadGratificante');
                
            }else{
                setShowInfo(false);
                setTextoBoton("¡Adelante!");
            }

        }
    };


    return (
        <>

            {/* Texto de la pizarra */}
            {showInfo ? (

                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    Lo que trabajaremos contigo se llama psicoterapia, y es un enfoque de tratamiento que se centra en ayudarte a entender y manejar tus pensamientos, 
                    sentimientos y comportamientos, y en mejorar tu capacidad para resolver problemas y manejar el estrés. Como ya hemos dicho, 
                    una característica de tener depresión es dejar de disfrutar de hacer actividades que antes te gustaban, así que si te parece empezaremos por ahí.
                </Text>

            ) : (

                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Me gustaría que escribieras 6 actividades o cosas que te gusten hacer que te generen bienestar y/o placer. No tiene que ser algo complicado, puede ser muy sencillo.
                </Text>

            )}

            {/* Botón siguiente con su texto */}
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
    );
};
