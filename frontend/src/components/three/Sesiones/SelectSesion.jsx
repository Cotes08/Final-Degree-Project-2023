import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CenteredContainer,
    StyledTypography,
    ButtonContainerCustom,
    StyledButtonCustom
} from '../../sharedStyles';




//Controlamos el boton

const startAnsiedad = () => {

};

const SelectSesion = () => {

    const [idUsuario, setIdUsuario] = useState('');

    //Variable de navegacion de router-dom
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;//Es obligatorio que este esto ya que si no se pone no podremos ver si hay una sesion activa

    //Comprobamos si es usuario logeado, si no lo es va a login, en el caso de que sea logeado pero psicologo se va a logeadoPsico
    useEffect(() => {
        Axios.get('http://localhost:3001/loginUsr').then((response) => {

            if (response.data.loggedIn !== true) {

                navigate('/');

            } else if (response.data.loggedIn === true && response.data.user.Psicologo === true) {

                navigate('/logeadoPsico');

            }
            setIdUsuario(response.data.user.Id);
        });
    });


    const startDeperesion = () => {

        //Le activamos la nueva sesion de tipo depresion
        Axios.post('http://localhost:3001/newActiveSesion', {

            idUsuario: idUsuario,
            tipo: 'Depresion'

        });
        navigate('/logeadoUser');
    };


    return (
        <CenteredContainer>
            <StyledTypography variant="h4" gutterBottom>
                Hola, bienvenido/a, mi nombre es Hana y te voy a acompañar en esta aventura. 
                Antes de nada, ¿Qué te gustaría trabajar?
            </StyledTypography>
            <ButtonContainerCustom>
                <StyledButtonCustom variant="contained" onClick={startDeperesion}>Depresión</StyledButtonCustom>
                <StyledButtonCustom variant="contained" onClick={startAnsiedad}>Ansiedad</StyledButtonCustom>
            </ButtonContainerCustom>
        </CenteredContainer>
    );
};

export default SelectSesion;
