/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Montañas(props) {
    const { nodes, materials } = useGLTF("./Modelos/Entorno/Montañas.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["Terrain_Plane001-Mesh"].geometry}
                material={materials.Grass}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["Terrain_Plane001-Mesh_1"].geometry}
                material={materials.Ground}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["Terrain_Plane001-Mesh_2"].geometry}
                material={materials.Snow}
            />
        </group>
    );
}

useGLTF.preload("./Modelos/Entorno/Montañas.glb");
