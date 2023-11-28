import { useEffect, useState } from 'react';

const ACTION_KEYBOARD_MAP = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
};


export const useKeyboard = () => {
    
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
    });


    useEffect(() => {
        
        const handleKeyDown = (event) => {
            const {code} = event;
            const action = ACTION_KEYBOARD_MAP[code]

            //Si ecnontramos la tecla pulsada en el diccionario de acciones entra
            if(action){
                setActions((prevActions) => ({
                    ...prevActions,/* Esto sirve para dejar las acciones como estaban antes */
                    [action]: true,
                }));
            }
        };

        const handleKeyUp = (event) => {
            const {code} = event;
            const action = ACTION_KEYBOARD_MAP[code]

            //Si encontramos la tecla pulsada en el diccionario de acciones entra
            if(action){
                setActions((prevActions) => ({
                    ...prevActions,/* Esto sirve para dejar las acciones como estaban antes */
                    [action]: false,
                }));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () =>{
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    return actions;
}