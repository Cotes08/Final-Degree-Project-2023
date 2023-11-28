import React from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from '@react-three/cannon';



export function Pizarra({posicionPizarra}) {

    const { nodes, materials } = useGLTF("./Modelos/Pizarra.glb");
    const [pizarra] = useBox(() => ({
        mass: 1,
        type: "Static",
        position: posicionPizarra,
        rotation: [0, Math.PI / 2, 0],
        args: [6, 3.5, 0.5]
    }));


    return (
        <>
            <group ref={pizarra} dispose={null} scale={[5, 6, 5]}>
                <mesh
                    castShadoww
                    receiveShadow
                    geometry={nodes.Blackboard_Q.geometry}
                    material={materials.phong1SG}
                />
            </group>
        </>
    );
};

useGLTF.preload("./Modelos/Pizarra.glb");