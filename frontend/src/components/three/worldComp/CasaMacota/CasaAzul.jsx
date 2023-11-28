/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function CasaAzul(props) {
    const { nodes, materials } = useGLTF("./Modelos/Casas/casaAzul.glb");
    return (
        <group dispose={null} {...props}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder002.geometry}
                material={materials["ventanas "]}
                position={[-3.55, 1.11, -2.54]}
                rotation={[0.48, -0.02, 0.01]}
                scale={1.51}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001.geometry}
                material={materials["house "]}
                position={[0.04, 1.17, -2.46]}
                rotation={[0, -0.02, -0.03]}
                scale={1.51}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={materials["house "]}
                position={[0.27, 0.53, -1.26]}
                rotation={[0, 0.46, 0]}
                scale={-0.08}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle002.geometry}
                material={materials["ventanas "]}
                position={[-1.59, 1.32, -2.3]}
                rotation={[3.08, -0.1, -3.13]}
                scale={0.5}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001.geometry}
                material={materials["ventanas "]}
                position={[1.57, 1.31, -2.07]}
                rotation={[0.01, -0.3, 0.03]}
                scale={0.5}
            />
        </group>
    );
}

useGLTF.preload("./Modelos/Casas/casaAzul.glb");
