import React, { createContext, useState } from 'react';

//Creamos el contexto
const ProfileContext = createContext();


const ProfileProvider = ({ children }) => {
    // Obtener el color y el apodo de la base de datos
    const [color, setColor] = useState('Rosa'); 
    const [apodo, setApodo] = useState(''); 

    // Proporcionamos el valor del contexto a los componentes envueltos
    return (
        <ProfileContext.Provider value={{ color, setColor, apodo, setApodo }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext, ProfileProvider };