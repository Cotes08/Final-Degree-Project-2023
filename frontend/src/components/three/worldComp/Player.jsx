import * as THREE from 'three'//Importamos three
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';


const CHARACTER_SPEED = 2;


export const Player = ({ handlePlayerApi, controlsEnabled }) => {


    const {
        moveForward,
        moveBackward,
        moveLeft,
        moveRight,
    } = useKeyboard();

    const { camera } = useThree();

    //Al crear la esfera le ponemos una refrerencia para poder manipularla y una api.
    //Esta api se usara para poder suscribirnos a ella e ir obteniendo sus eventdos
    //De esta forma podemos anlcar la canara a la esfera
    const [SphereRef, SphereApi] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 0.4, 2],
        args: [0.48]
    }));


    //Es mejor usar useRef que useState para no renderizar el componente constantemente
    const posicion = useRef([0, 0, 0]);
    useEffect(() => {
        SphereApi.position.subscribe((pos) => {
            posicion.current = pos;
        });
        handlePlayerApi(SphereApi);
    }, [SphereApi.position, handlePlayerApi, SphereApi]);

    //Actualizamos la variable velocidad y posicion con los valores que nos da la api de la esfera
    const velocidad = useRef([0, 0, 0]);
    useEffect(() => {
        SphereApi.velocity.subscribe((vel) => {
            velocidad.current = vel;
        });
    }, [SphereApi.velocity]);


    //Las variables de la posicion las copiamos a la camara para que se quede fija a la esfera
    useFrame(() => {
        if (controlsEnabled === true) {
            camera.position.copy(
                new THREE.Vector3(
                    posicion.current[0],
                    posicion.current[1] + 0.9,
                    posicion.current[2]
                )
            );

            const direction = new THREE.Vector3();

            //Creamos un vector direccion el cual tendra 2 vectores
            //El primero es el vector de la direccion hacia adelante o hacia atras
            //El segundo es el vector de la direccion hacia la izquierda o hacia la derecha
            const frontVector = new THREE.Vector3(
                0,
                0,
                (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)//Esto se hace para que si se pulsa las dos teclas no se mueva
            );

            const sideVector = new THREE.Vector3(
                (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
                0,
                0
            );

            //Aqui se crea el vector direccion que sera la suma de los dos vectores anteriores

            direction
                .subVectors(frontVector, sideVector)
                .normalize()
                .multiplyScalar(CHARACTER_SPEED)//Esta es la velocidad que escala la velocidad de la esfera
                .applyEuler(camera.rotation);//Esto cancela la rotacion de la camara para que la esfera se mueva en la direccion que mira la camara


            //Aqui le aplicamos a la esfera la velocidad que hemos calculado en la direccion
            SphereApi.velocity.set(
                direction.x,
                velocidad.current[1],
                direction.z
            );
        }else{
            SphereApi.velocity.set(0, 0, 0)
        }

    });


    return (
        <group>
            <mesh ref={SphereRef} />
        </group>
    )

};