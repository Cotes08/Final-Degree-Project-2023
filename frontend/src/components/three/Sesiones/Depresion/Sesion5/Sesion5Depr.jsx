import React, { useState, useRef } from "react";
import { RoundedBox, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';


/* Esta es la sesion 4.2 */
export function Sesion5Depr({ color, PlayerApi, posicionPizarra }) {

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

                if (newIndex === 8) {
                    setTextoBoton("¡Puedo con ello!");
                } else if (newIndex > 8) {
                    navigate('/pensamientoAutomatico');
                }
                return newIndex;
            })

        }
    };


    return (
        <>Bienvenido/a a la sesión 4 de depresion, la primera sesión de Mindfulness

            {showInfo === 0 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    Bienvenido/a a la sesión 5 de depresión, la segunda sesión de Mindfulness. En esta segunda sesión explicaremos cómo nuestros pensamientos,
                    a veces siguen un patrón del que no somos conscientes y nos pueden afectar a nuestro estado de ánimo.
                </Text >


            ) : showInfo === 1 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}>
                    “Los pensamientos automáticos surgen automáticamente en nuestra mente sin que nos demos cuenta.
                    Son muy rápidos y a veces sentimos que esos pensamientos son verdades absolutas, cuando no tienen el por qué.”
                </Text >


            ) : showInfo === 2 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    A continuación veremos algunos tipos de pensamientos automáticos.

                </Text >


            ) : showInfo === 3 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Pensamiento catastrófico: Es cuando tendemos a adelantar acontecimientos de modo que pensemos que pasará lo peor para nosotros/as sin tener evidencias de que vaya a ocurrir
                </Text >


            ) : showInfo === 4 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    Sobregeneralización: Cuando nos pasa algo una vez pensamos que nos volverá a pasar ya siempre sin tener evidencias.
                </Text >


            ) : showInfo === 5 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    Magnificación o minimización: cuando valoramos de forma exagerada o minimizamos las cosas que nos afectan emocionalmente.
                    Por ejemplo: resbalar y caernos en la calle y pensar que somos un idiota por habernos caído (Magnificación)
                    o ser felicitados por haber sacado un 7 en un examen y pensar que somos idiotas por no haber sacado más nota (minimización)
                </Text >


            ) : showInfo === 6 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    Pensamiento polarizado: Cuando valoramos algo de forma extrema sin tener en cuenta las opciones intermedias, es decir, pensar que o es todo o es nada.
                </Text >


            ) : showInfo === 7 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    Falacia de justicia: Cuando creemos que algo es injusto porque no cubre nuestras necesidades y deseos.
                </Text >


            ) : (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify" 
                >
                    Bien, ahora vamos a hacer un juego. Te presentaré diversos casos y te pondré tres opciones de respuesta.
                    Deberás seleccionar el pensamiento automático que está teniendo la persona de cada caso.
                </Text >
            )}

            {/* Botón siguiente con su texto */}
            {textoBoton === "Siguiente" ? (
                <group>
                    <mesh position={[-4.9, 1, -0.5]} rotation={[0, Math.PI / 2, 0]} onClick={handleClickBotonPizarra}>
                        <RoundedBox args={[2, 0.5, 0.2]} radius={0.1} smoothness={4}>
                            <meshBasicMaterial attach="material" color={color} />
                        </RoundedBox>
                    </mesh>
                </group>


            ) : (

                <group>
                    <mesh position={[-4.9, 1, -0.5]} rotation={[0, Math.PI / 2, 0]} onClick={handleClickBotonPizarra}>
                        <RoundedBox args={[2.5, 0.5, 0.2]} radius={0.1} smoothness={4}>
                            <meshBasicMaterial attach="material" color={color} />
                        </RoundedBox>
                    </mesh>
                </group>

            )}
            <Text position={[-4.79, 1, -0.5]} fontSize={0.3} color={'#000000'} rotation={[0, Math.PI / 2, 0]}>
                {textoBoton}
            </Text>
        </>
    );
};
