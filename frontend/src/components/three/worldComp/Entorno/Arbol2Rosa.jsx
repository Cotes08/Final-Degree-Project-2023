/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Arbol2Rosa(props) {
    const { nodes, materials } = useGLTF("./Modelos/Entorno/arbol2Rosa.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder.geometry}
                material={materials["arbol tronvo"]}
                position={[0, 0.12, 0]}
                scale={0.1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials["arbol copa "]}
                position={[0, 1.32, 0]}
                scale={0.65}
            />
        </group>
    );
}

useGLTF.preload("./Modelos/Entorno/arbol2Rosa.glb");
