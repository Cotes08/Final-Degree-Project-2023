import React from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from '@react-three/cannon';

export function ModeloTV() {

    useBox(() => ({
        mass: 1,
        type: "Static",
        position: [6, 1.8, -0.6],
        rotation: [0, Math.PI/2, 0],
        args: [5.5, 3, 0.5]
    }));

    const { nodes, materials } = useGLTF("./Modelos/Pantalla.glb");
    return (
        <group position={[6, 0, -0.5]} rotation={[0, Math.PI, 0]} scale={3} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["TV_Cube-Mesh"].geometry}
                material={materials.Tone1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["TV_Cube-Mesh_1"].geometry}
                material={materials.Screen}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["TV_Cube-Mesh_2"].geometry}
                material={materials.Tone2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["TV_Cube-Mesh_3"].geometry}
                material={materials.Screw}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["PowerButton_Cube004-Mesh"].geometry}
                material={materials.Tone2}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["PowerButton_Cube004-Mesh_1"].geometry}
                material={materials.White}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Legs_Cube005.geometry}
                material={materials.Tone2}
            />
        </group>
    );
}

useGLTF.preload("./Modelos/Pantalla.glb");

