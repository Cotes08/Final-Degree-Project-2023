/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Arbol1Rosa(props) {
    const { nodes, materials } = useGLTF("./Modelos/Entorno/arbol1Rosa.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007.geometry}
                material={materials["arbol copa .002"]}
                position={[0, -0.01, 0]}
                scale={0.16}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder006.geometry}
                material={materials["arbol tronvo.002"]}
                position={[0, 1.13, -0.23]}
                scale={0.72}
            />
        </group>
    );
}

useGLTF.preload("./Modelos/Entorno/arbol1Rosa.glb");