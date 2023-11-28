import React, { useContext } from "react";
import { usePlane } from "@react-three/cannon";
import { ProfileContext } from '../../../ProfileContext';

export function Ground() {

    const { color } = useContext(ProfileContext);

    const getColorGround = (color) => {
        switch (color) {
            case 'Rosa':
                return '#f0a8b6';
            case 'Azul':
                return '#bcd6f3';
            case 'Verde':
                return '#a1dfae';
            case 'Lila':
                return '#daa9e3';  
            default:
                return '#000000';
        }
    };


    //Colocamos el plano en la posicion 0,0,0 y lo rotamos 90 grados para que quede horizontal
    const [plano] = usePlane(() => ({
        rotation: [-Math.PI/2, 0, 0],
        position: [0, 0, 0],
    }));
    
    
    return (
        <mesh ref={plano} receiveShadow> {/* Esta es la maya que recubre el objeto, contiene geometria y textura */}
            <planeGeometry attach="geometry" args={[2000, 2000, 100, 100]}/>
            <meshStandardMaterial attach="material" color={getColorGround(color)} />
        </mesh>
    );
}