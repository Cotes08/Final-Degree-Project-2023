import React, { useState, useRef } from "react";
import { Text, RoundedBox } from '@react-three/drei';
import Axios from 'axios';


export function Sesion1Depr({ color, PlayerApi, idUsuario, updateSesionActiva, setShowSesion1Depr, posicionPizarra }) {
    const [showInfo, setShowInfo] = useState(0);
    const [textoBoton, setTextoBoton] = useState('Siguiente');
    const playerPosition = useRef([0, 0, 0]);

    //Se ejecuta al hacer click a la pizarra
    const handleClickBotonPizarra = () => {
        //Establecemos el valor maximo de 
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
                if (newIndex >= 2) {

                    if (newIndex === 2) {
                        setTextoBoton("Continuar");

                    } else if (newIndex === 3) {
                        Axios.post('http://localhost:3001/changeActiveSesion', {

                            idUsuario: idUsuario,

                        }).then((response) => {
                            if (response.status === 200) {
                                updateSesionActiva();
                                setShowSesion1Depr(false);

                            }

                        });

                    }
                }
                return newIndex;
            });
        }
    };

    return (
        <>
            {/* Texto de la pizarra */}
            {showInfo === 0 ? (

                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" /* font="./coolvetica.woff"  Hay un problema con esto */
                >
                    La depresión es una enfermedad mental que puede afectar el estado de ánimo, los pensamientos, la conducta y el cuerpo.
                    Puedes sentirte triste, sin energía, sin esperanza y sin interés en actividades que antes disfrutabas.
                    Es importante que comprendas que la depresión no es tu culpa, y que no es una debilidad personal o un defecto de carácter.
                </Text>

            ) : showInfo === 1 ? (
                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Es importante que sepas que la depresión no es una condición permanente, y que la mayoría de
                    las personas que reciben tratamiento pueden recuperarse y volver a disfrutar de una vida plena y satisfactoria.
                    Sin embargo, es fundamental que sigas las recomendaciones del tratamiento, asistas a las sesiones de terapia
                    y tomes participación activa en tu recuperación, intentando hacer cambios positivos en tu estilo de vida,
                    como hacer ejercicio, dormir lo suficiente y seguir una dieta saludable.
                </Text>
            ) : (

                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    ¡Has completado la primera sesión, habla con la mascota para continuar con la segunda sesión!
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
