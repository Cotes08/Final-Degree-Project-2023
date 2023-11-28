import React, { useState, useRef } from "react";
import { RoundedBox, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';


/* Esta es la sesion 4.4 y */
export function Sesion7Depr({ color, PlayerApi, posicionPizarra }) {

    const playerPosition = useRef([0, 0, 0]);
    const [showInfo, setShowInfo] = useState(0);
    const [textoBoton, setTextoBoton] = useState('Siguiente');

    //Variable de navegacion de router-dom
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

            setShowInfo((prevIndex) => {
                const newIndex = prevIndex + 1;

                if (newIndex === 2) {
                    setTextoBoton("¡Vamos allá!");
                } else if (newIndex > 2) {
                    navigate('/pilotoAutomatico');
                }
                return newIndex;
            })

        }
    };


    return (
        <>

            {showInfo === 0 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    Bienvenido/a a la sesión 7 de depresión, la cuarta sesión de Mindfulness. Como vimos en la sesión pasada,
                    las personas tenemos pensamientos que a veces nos vienen sin darnos cuenta y nos hacen sentir mal o incómodos/as.
                    Por ello es necesario evaluar si de verdad nos sirve tener ese pensamiento o podemos dejarlo ir.
                </Text >


            ) : showInfo === 1 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Algunos ejemplos de pensamientos automáticos comunes son: “soy un fracaso”, “no valgo para nada”,
                    “siempre lo hago mal”, “nadie me quiere”, entre otros. Estos pensamientos suelen ser negativos y
                    nos puede afectar a nivel emocional e incluso en nuestro comportamiento: si pienso que “soy un fracaso” por ejemplo,
                    no me esforzaré lo suficiente en una tarea, por lo que no obtendré buenos resultados y ello reforzará todavía más
                    mi pensamiento de que “soy un fracaso”.
                </Text >


            ) : (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    ¡Vamos a ponerlo en práctica!
                </Text >
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
