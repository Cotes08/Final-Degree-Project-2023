/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Text, RoundedBox, Html } from '@react-three/drei';
import Axios from 'axios';

/* Esta es la sesion 4.7 y le corresponde el audio sesion7 */
export function Sesion10Depr({ color, PlayerApi, idUsuario, updateSesionActiva, setShowSesion10Depr, posicionPizarra }) {

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

            if (newIndex === 22) {
                setAudioSesion(document.getElementById('audioSesion10Depr'));
                setShowAudio(true);
            } else if (newIndex === 24) {

                Axios.post('http://localhost:3001/changeActiveSesion', {

                    idUsuario: idUsuario,

                }).then((response) => {
                    if (response.status === 200) {
                        updateSesionActiva();
                        setShowSesion10Depr(false);
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
                <audio id="audioSesion10Depr" src={'./AudioSesionesDepr/Sesion7.mp3'} />
            </Html>

            {showInfo === 0 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Bienvenido/a la sesión 10 de depresión, la séptima y última sesión de Mindfulness. Hoy te enseñaré algunas técnicas de habilidades sociales para mejorar nuestras
                    relaciones con los demás y nos sintamos mejor. Los humanos somos seres sociales y la manera en cómo nos comunicamos
                    puede determinar la calidad de dichas relaciones.
                </Text >


            ) : showInfo === 1 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.19} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    En sesiones anteriores hemos aprendido cómo no evaluando nuestros pensamientos automáticos pueden afectarnos tanto a nosotros como a los demás.
                </Text >


            ) : showInfo === 2 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    También hemos aprendido en la sesión anterior que manteniendo una atención plena a las palabras, expresiones y emociones
                    de los demás mientras nos estamos comunicando, puede mejorar nuestras habilidades comunicativas y reforzar y mejorar
                    la calidad de dichas relaciones.
                </Text >


            ) : showInfo === 3 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}

                >
                    A continuación, te enseñaré algunas técnicas de habilidades sociales:
                </Text >


            ) : showInfo === 4 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    - Cómo decir NO asertivamente: existen algunas técnicas de comunicación para decir No a alguien de manera respetuosa
                    y clara, sin sentir miedo o culpa al hacerlo.
                </Text >


            ) : showInfo === 5 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Una de las técnicas es el disco rayado, el cual consiste en decir varias veces la frase en la que tú dices que
                    NO cuando alguien te intenta convencer, y así mantienes tu posición y expresas tus límites.
                </Text >


            ) : showInfo === 6 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Por ejemplo: cuando un amigo te insiste en que le des los resultados de los deberes que tanto te han costado hacerlos a
                    ti y tú no quieres dárselos porque lo consideras injusto que la otra persona no se haya esforzado lo mismo que tú y tenga tus resultados.
                </Text >


            ) : showInfo === 7 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Una manera de decir que no podría ser: “No te los dejo porque me han costado mucho”.
                </Text >


            ) : showInfo === 8 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Si la persona te insiste podrías seguir diciendo que no, pero con otras palabras: “No te los dejo de verdad, si yo he podido,
                    tú también puedes” ... y así hasta que decidas que ya no quieres dar más explicaciones o la otra persona acepte que no se los vas a dejar.
                </Text >


            ) : showInfo === 9 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Y no pasa nada si no se los dejas, estarás haciendo algo bueno por tu compañero para que aprenda a hacerlos y poder aprobar el examen.
                </Text >


            ) : showInfo === 10 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    - Saber qué decir cuando alguien está muy enfadado y te está gritando: a veces las discusiones pueden llegar
                    a enfadar todavía más a las personas y ese enfado se contagia.
                </Text >


            ) : showInfo === 11 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Cuando alguien grita, a veces la otra persona le responde gritando porque se altera, pero entonces
                    si ambas personas pierden las formas, la discusión no se solucionará correctamente e incluso puede llegar a deteriorar la relación.
                </Text >


            ) : showInfo === 12 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Es por eso que es necesario mantener la calma ante este tipo de situaciones, respirar profundamente y
                    sí en ese momento sabes que la persona te va a seguir faltando al respeto con gritos o malas palabras,
                    tienes el derecho de salir de la situación y posponer la conversación.
                </Text >


            ) : showInfo === 13 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Para estas situaciones existen frases que se podrían decir, como:
                    “Ahora mismo estás muy alterado y las cosas no se solucionan gritando,
                    cuando estemos más tranquilos hablaremos” o “ahora mismo no me estoy sintiendo bien hablando contigo,
                    hablamos más tarde cuando estemos más tranquilos”.
                </Text >


            ) : showInfo === 14 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    - Incluir el uso de “yo” en lugar de “tú”: en ocasiones, cuando nos sentimos mal con alguien y se lo estamos diciendo,
                    solemos usar mucho el término “tú”, como: “tú nunca me ayudas”, “tú me hablas mal”, “tú siempre estás con tus amigos
                    y no te acuerdas de mí”, “tú no haces nada en casa” ...
                </Text >


            ) : showInfo === 15 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Cuando incluimos el “tú” en las conversaciones, sobre todo en discusiones, creamos en la otra persona
                    la sensación de que le estamos atacando (aunque no sea así) y por ende esta persona reacciona en defensa
                    a ese ataque y comienzan a alzar la voz, utilizar malas palabras e incluso no querer participar en la conversación.
                </Text >


            ) : showInfo === 16 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Para evitar esto, se podría intercambiar el “tú” por el “yo” para expresar nuestros
                    sentimientos y emociones que nos genera la otra persona.
                </Text >


            ) : showInfo === 17 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Así la otra persona puede saber cómo nos sentimos y se pueda resolver la situación, por ejemplo:
                    en vez de “tú nunca me ayudas” decir “me gustaría que me ayudaras”;
                    en vez de “tú me hablas mal” decir “siento mal cuando me hablas de esa forma, porque yo sí te hablo bien”;
                </Text >


            ) : showInfo === 18 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    En vez de “tú siempre estás con tus amigos y no te acuerdas de mí” decir “está bien que pases tiempo con tus amigos,
                    pero me gustaría estar más contigo”: en vez de “tú no haces nada en casa” decir “me gustaría que colaborases en la limpieza de nuestra casa”.
                </Text >


            ) : showInfo === 19 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Muy bien, ahora que te he explicado algunas técnicas, me gustaría ponerlas a prueba.

                </Text >


            ) : showInfo === 20 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Vamos a realizar una sesión de meditación guiada, y me gustaría que te imaginases una situación en la que estás
                    discutiendo con alguien que está muy alterado/a.
                </Text >


            ) : showInfo === 21 ? (
                < Text position={[-4.95, 2.3, -0.5]} fontSize={0.2} color={'#000000'} maxWidth={5} rotation={[0, Math.PI / 2, 0]}
                    textAlign="justify"
                >
                    Deberás mantener la calma y resolver el conflicto con la persona de manera asertiva teniendo en cuenta lo explicado en esta sesión.
                </Text >


            ) : showInfo === 22 ? (
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
                    Ya hemos terminado la sesión de hoy. ¿Qué te ha parecido? Espero que hayas disfrutado y
                    te hayas sentido cómodo/a resolviendo el conflicto. Esta técnica la puedes aplicar en tu día a día
                    para mejorar tus habilidades de comunicación con los demás y tu bienestar.
                    ¡Nos vemos en la próxima y última sesión!
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
