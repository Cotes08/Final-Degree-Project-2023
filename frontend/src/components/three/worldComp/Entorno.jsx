import React, { useContext } from "react";
import { ProfileContext } from '../../../ProfileContext';
import { Arbol1Azul } from './Entorno/Arbol1Azul';
import { Arbol1Rosa } from './Entorno/Arbol1Rosa';
import { Arbol1Verde } from './Entorno/Arbol1Verde';
import { Arbol1Lila } from './Entorno/Arbol1Lila';
import { Arbol2Azul } from './Entorno/Arbol2Azul';
import { Arbol2Rosa } from './Entorno/Arbol2Rosa';
import { Arbol2Verde } from './Entorno/Arbol2Verde';
import { Arbol2Lila } from './Entorno/Arbol2Lila';
import { Montañas } from './Entorno/Montañas';

export function Entorno() {
    const { color } = useContext(ProfileContext);
    const arboles = [];
    const minX = -30;
    const maxX = 30;
    const minZ = -30;
    const maxZ = 30;
    const filas = 15;
    const columnas = 15;
    const ancho = (maxX - minX) / columnas;
    const alto = (maxZ - minZ) / filas;
    const maxIntentos = 1000;

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            let x, z;
            let valido = false;
            let intentos = 0;
            while (!valido && intentos < maxIntentos) {
                x = Math.random() * ancho + minX + ancho * j;
                z = Math.random() * alto + minZ + alto * i;
                valido = (x < -8 || x > 9) || (z < -15 || z > 13);
                for (let k = 0; k < arboles.length; k++) {
                    const arbol = arboles[k];
                    const dx = arbol.props.position[0] - x;
                    const dz = arbol.props.position[2] - z;
                    const distancia = Math.sqrt(dx * dx + dz * dz);
                    if (distancia < 1.7) {
                        valido = false;
                        break;
                    }
                }
                intentos++;
            }
            if (valido) {
                const scale = Math.random() * (2.3 - 1.6) + 1.6;
                if (color === 'Rosa') {
                    if ((i + j) % 2 === 0) {
                        arboles.push(<Arbol1Rosa position={[x, 0, z]} scale={scale} />);
                    } else {
                        arboles.push(<Arbol2Rosa position={[x, 0, z]} scale={scale} />);
                    }
                } else if (color === 'Azul') {
                    if ((i + j) % 2 === 0) {
                        arboles.push(<Arbol1Azul position={[x, 0, z]} scale={scale} />);
                    } else {
                        arboles.push(<Arbol2Azul position={[x, 0, z]} scale={scale} />);
                    }
                } else if (color === 'Verde') {
                    if ((i + j) % 2 === 0) {
                        arboles.push(<Arbol1Verde position={[x, 0, z]} scale={scale} />);
                    } else {
                        arboles.push(<Arbol2Verde position={[x, 0, z]} scale={scale} />);
                    }
                } else if (color === 'Lila') {
                    if ((i + j) % 2 === 0) {
                        arboles.push(<Arbol1Lila position={[x, 0, z]} scale={scale} />);
                    } else {
                        arboles.push(<Arbol2Lila position={[x, 0, z]} scale={scale} />);
                    }
                }
            }
        }
    }

    return (
        <group dispose={null}>
            <Montañas position={[0, -4.6, -30]} scale={[0.5, 0.5, 0.5]} />
            <Montañas position={[0, -4.6, 30]} scale={[0.5, 0.5, 0.5]} rotation={[0, Math.PI, 0]} />
            {arboles}
        </group>
    );
}
