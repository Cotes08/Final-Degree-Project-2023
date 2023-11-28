import React, { useState, useRef } from "react";
import { Text, RoundedBox } from '@react-three/drei';
import Axios from 'axios';


export function Sesion11Depr({ color, PlayerApi, idUsuario, updateSesionActiva, setShowSesion11Depr, posicionPizarra }) {
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

                    if (newIndex === 8) {
                        setTextoBoton("¡Gracias por todo!");

                    } else if (newIndex === 9) {
                        Axios.post('http://localhost:3001/changeActiveSesion', {

                            idUsuario: idUsuario,

                        }).then((response) => {
                            if (response.status === 200) {
                                updateSesionActiva();
                                setShowSesion11Depr(false);
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
                    Bienvenido/a, hemos llegado hasta la última sesión del programa. ¡Felicidades, lo has hecho genial!
                </Text>

            ) : showInfo === 1 ? (
                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.19} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Tras realizar las 3 primeras sesiones introductorias a este conjunto de sesiones de depresión, te dimos paso a las sesiones de mindfulness.
                    A continuación, repasaremos 1 a 1 las sesiones de mindfulness que has realizado hasta ahora.

                </Text>
            ) : showInfo === 2 ? (
                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.19} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    En la sesión 4 (Consciencia plena y respiración) te enseñaba a sentir tu cuerpo y a centrarte en tu respiración.
                    Ese ejercicio es muy bueno para decidir en qué centrarnos, aunque existan distractores como ruidos o incluso otros
                    pensamientos que nos vienen de manera automática, como lo vimos en la sesión 5 (¿Pienso de manera automática?),
                    donde además de aprender a identificar esos pensamientos automáticos que nos viene sin darnos cuenta, aprendemos a ponerles nombre.

                </Text>
            ) : showInfo === 3 ? (
                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Esos pensamientos automáticos son normales tenerlos y es imposible intentar eliminarlos porque le estaremos pidiendo
                    a nuestro cerebro que deje de realizar la función que tiene, que es generar pensamientos. En la sesión 6 (Lo veo, lo acepto)
                    enseña que debemos aceptar que los pensamientos van a estar ahí y que, aunque lo aceptemos, podemos decidir si darles importancia o no.
                </Text>
            ) : showInfo === 4 ? (
                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Pero a veces tenemos pensamientos que no nos hacen bien y es importante detectarlos y cuestionarnos
                    de dónde vienen y porqué tenemos ese pensamiento. La sesión 7 (Botón de piloto automático) nos enseña,
                    a través de una serie de preguntas, a cuestionar esos pensamientos y a darnos cuenta si de verdad nos está sirviendo tener ese pensamiento.
                </Text>
            ) : showInfo === 5 ? (
                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Los pensamientos automáticos se generan de manera rápida y sin darnos cuenta. A veces eso hace que el cerebro
                    tenga muchos pensamientos en la cabeza a la vez para poder gestionar y superar todos los retos que nos supone nuestro día a día.
                </Text>
            ) : showInfo === 6 ? (
                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    La sesión 8 (Mundo lleno de estrés) nos habla de los diferentes tipos de estrés para saber identificarlos y nos enseña,
                    en el caso de que estemos en una situación en las que nos sentimos estresados/as, un tipo de meditación para poder relajarnos,
                    centrar nuestra atención en la respiración y sentir la presencia nuestro cuerpo.
                </Text>
            ) : showInfo === 7 ? (
                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    En la sesión 9 (Estoy presente cuando te hablo) aprendemos a cómo mantener la atención a las palabras,
                    expresiones y emociones de los demás a la hora de comunicarnos, y en la sesión 10
                    (Mi relación con los demás estando triste- ansioso/a) se explican algunas técnicas de habilidades sociales
                    para que nuestras relaciones interpersonales sean satisfactorias.
                </Text>
            ) : (

                <Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    ¡Has completado la sesión de depresión al completo! Estoy orgullosa de ti. Ya verás como a partir de ahora todo irá mejor. ¡Ánimo!
                </Text>

            )}

            {/* Botón siguiente con su texto */}
            {showInfo > 7 ? (
                <>
                    <group>
                        <mesh position={[-4.9, 1, -0.5]} rotation={[0, Math.PI / 2, 0]} onClick={handleClickBotonPizarra}>
                            <RoundedBox args={[2.6, 0.5, 0.2]} radius={0.1} smoothness={4}>
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
            )}


        </>
    );
};
