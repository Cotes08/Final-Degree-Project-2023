import React, { useContext, useRef, useState } from "react";
import ConfirmCerrarSesion from './Modals/ConfirmCerrarSesion';
import { ProfileContext } from '../../../ProfileContext';
import { CasaUsr } from "./CasaUsr/CasaUsr";
import { CasaRosa } from "./CasaMacota/CasaRosa";
import { CasaAzul } from "./CasaMacota/CasaAzul";
import { CasaVerde } from "./CasaMacota/CasaVerde";
import { CasaLila } from "./CasaMacota/CasaLila";

export function Casa({ colorCasa, PlayerApi }) {


    const [modal, setModal] = useState(false);
    const { color } = useContext(ProfileContext);
    const posicionCasaMascota = [0, 0, 6];
    const escalaCasaMascota = 1;
    const posicionCasa = [0, 0, -9.5];
    const escalaCasa = 0.65;
    const playerPosition = useRef([0, 0, 0]);


    //Se ejecuta al hacer click a la mascota
    const handleObjectClick = () => {

        const umbral = 3;

        //Obtenemos la posicion del jugador
        PlayerApi.position.subscribe((pos) => {
            playerPosition.current = pos;
        });

        //Calculamos la distancia entre el jugador y la mascota
        const distancia = Math.sqrt(
            Math.pow(playerPosition.current[0] - posicionCasaMascota[0], 2) +
            Math.pow(playerPosition.current[1] - posicionCasaMascota[1], 2) +
            Math.pow(playerPosition.current[2] - posicionCasaMascota[2], 2)
        );

        if (distancia < umbral) {
            toggle();
        }

    };

    const toggle = () => {
        setModal(!modal);
    }

    return (
        <>
            <group dispose={null}>

                <CasaUsr position={posicionCasa} scale={escalaCasa} color={colorCasa} />

                {color === 'Rosa' ? (
                    <>
                        <CasaRosa position={posicionCasaMascota} scale={escalaCasaMascota} rotation={[0, Math.PI, 0]} onDoubleClick={handleObjectClick} />
                    </>

                ) : color === 'Azul' ? (
                    <>
                        <CasaAzul position={posicionCasaMascota} scale={escalaCasaMascota} rotation={[0, Math.PI, 0]} onDoubleClick={handleObjectClick} />
                    </>

                ) : color === 'Verde' ? (
                    <>
                        <CasaVerde position={posicionCasaMascota} scale={escalaCasaMascota} rotation={[0, Math.PI, 0]} onDoubleClick={handleObjectClick} />
                    </>
                ) : color === 'Lila' ? (
                    <>
                        <CasaLila position={posicionCasaMascota} scale={escalaCasaMascota} rotation={[0, Math.PI, 0]} onDoubleClick={handleObjectClick} />
                    </>
                ) : (
                    <></>
                )}

            </group>
            {modal && (<ConfirmCerrarSesion modal={modal} toggle={toggle} />)}
        </>
    );
}
