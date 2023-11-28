import React, { useEffect, useState, useContext } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { ProfileContext } from '../../../ProfileContext';



export function Bocadillo({ sesionActiva }) {

    const [infoSesion, setInfoSesion] = useState('');
    const { apodo } = useContext(ProfileContext);


    useEffect(() => {

        if (sesionActiva.SesionActiva === false) {
            setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para seleccionar la sesión que desees realizar.`);
        } else {
            switch (sesionActiva.idSesion) {
                case 1:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 1 de depresión. Psicoeducación. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 2:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 2 de depresión. Actividades gratificantes. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 3:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 3 de depresión. Relajación muscular. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 4:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 4 de depresión. Consciencia del cuerpo y respiración. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 5:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 5 de depresión. ¿Pienso de manera automática? ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 6:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 6 de depresión. Lo veo, lo acepto. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 7:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 7 de depresión. Botón de piloto automático. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 8:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 8 de depresión. Mundo lleno de estrés. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 9:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 9 de depresión. Estoy presente cuando te hablo. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 10:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 10 de depresión. Mi relación con los demás estando triste. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                case 11:
                    setInfoSesion(`¡Hola ${apodo}! Interactúa conmigo para iniciar la sesión 11 de depresión. Todo lo que he aprendido. ¡Mira la pizarra que tienes a tu izquierda y lee atentamente!`);
                    break;
                default:

                    break;
            }

        }



    }, [sesionActiva, apodo]);

    const { nodes, materials } = useGLTF("./Modelos/Bocadillo.glb");
    return (
        <>
            <group dispose={null} position={[-2.8, 1.6, -4]} rotation={[0, Math.PI + 0.3, 0]}>
                <mesh

                    castShadow
                    receiveShadow
                    geometry={nodes.group316831793.geometry}
                    material={materials.mat21}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.group1632295280.geometry}
                    material={materials.mat21}
                />
            </group>

            <Text position={[-2.29, 1.9, -4.31]} rotation={[0, 0.3, 0]} fontSize={0.1} color={'#000000'} maxWidth={1.5} textAlign="center" >
                {infoSesion}
            </Text>

        </>
    );
}

useGLTF.preload("./Modelos/Bocadillo.glb");
