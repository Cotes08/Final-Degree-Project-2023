import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CenteredContainer,
    StyledTypography,
    StyledButtonActividades,
    BoxActividadGartificante,
    TextFieldActividadGartificante,
    Theme,
    StyledTextActividad,
    StyledFormControl
} from '../../../../sharedStyles';
import Checkbox from '@mui/material/Checkbox';

const ActividadGratificante = () => {



    const [actividades, setActividades] = useState(Array(6).fill(''));
    const [confirmed, setConfirmed] = useState(false);
    const [actividadesSelect, setActividadesSelect] = useState([]);
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


    const handleActividadChange = (index, event) => {

        setActividades(prevActividades => {
            const newActividades = [...prevActividades];
            newActividades[index] = event.target.value;
            return newActividades;
        });

    };

    const actividadesConfirm = () => {
        setConfirmed(true);
    };

    const handleCheckboxChange = (index) => {
        setActividadesSelect(prevActividadesSelect => {
            const selectedActivities = [...prevActividadesSelect];
            const activity = actividades[index];
            const selectedIndex = selectedActivities.indexOf(activity);
            if (selectedIndex === -1) {
                if (selectedActivities.length < 2) {
                    selectedActivities.push(activity);
                }
            } else {
                selectedActivities.splice(selectedIndex, 1);
            }
            return selectedActivities;
        });
    };

    const handleFinSesion = () => {

        const datosSesion = 'Sesión completada, actividades gratificantes seleccionadas: ' + actividadesSelect[0] + ' y ' + actividadesSelect[1]+ '.';

        Axios.post('http://localhost:3001/changeActiveSesion', {

            idUsuario: idUsuario,
            datosSesion: datosSesion,

        }).then((response) => {
            if (response.status === 200) {
                navigate('/logeadoUser');
            }
        });
    };


    const theme = Theme();
    return (
        <ThemeProvider theme={theme}>
            <CenteredContainer>
                {confirmed ? (
                    <StyledTextActividad>
                        Ahora de esas 6 actividades o cosas que te gustan hacer, te pido que escojas 2 para realizarlas al menos una vez al día durante una semana.
                        Es importante que te comprometas a realizarlas para así participar activamente en tu recuperación.
                    </StyledTextActividad>
                ) : (
                    <StyledTypography>Escribe aquí tus 6 actividades gratificantes</StyledTypography>
                )}

                <BoxActividadGartificante>
                    {confirmed ? (
                        <>
                            {actividades.map((actividad, index) => (
                                <StyledFormControl
                                    key={index}
                                    control={<Checkbox
                                        onChange={() => handleCheckboxChange(index)}
                                        disabled={!actividadesSelect.includes(actividad) && actividadesSelect.length >= 2}
                                    />}
                                    label={actividad}
                                />
                            ))}
                            <StyledButtonActividades disabled={actividadesSelect.length !== 2} onClick={handleFinSesion}>¡Lo haré!</StyledButtonActividades>
                        </>
                    ) : (
                        <>
                            {[...Array(6)].map((_, index) => (
                                <TextFieldActividadGartificante
                                    key={index}
                                    label={`Actividad gratificante ${index + 1}`}
                                    onChange={event => handleActividadChange(index, event)}
                                />
                            ))}
                            <StyledButtonActividades disabled={!confirmed && actividades.some(actividad => !actividad)} onClick={actividadesConfirm}>Confirmar</StyledButtonActividades>
                        </>
                    )}
                </BoxActividadGartificante>
            </CenteredContainer>
        </ThemeProvider>
    );
};

export default ActividadGratificante;
