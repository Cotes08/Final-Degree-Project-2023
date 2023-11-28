import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './UiPsicologo.css';

const Paciente = (props) => {
    const navigate = useNavigate();

    const handleVerPaciente = (event) => {
        if (event.ctrlKey) {
            const paciente = {
                idUsuario: props.idUsuario,
                Nombre: props.Nombre,
                Apellidos: props.Apellidos,
                Email: props.Email,
                Fecha_nac: props.Fecha_nac,
                idPsicologo: props.idPsicologo
            };
            localStorage.setItem('datosPaciente', JSON.stringify(paciente));
            window.open(`/paciente/${props.idUsuario}`);
        } else {
            event.preventDefault();
            navigate(`/paciente/${props.idUsuario}`, {
                state: {
                    paciente: {
                        idUsuario: props.idUsuario,
                        Nombre: props.Nombre,
                        Apellidos: props.Apellidos,
                        Email: props.Email,
                        Fecha_nac: props.Fecha_nac,
                        idPsicologo: props.idPsicologo
                    }
                }
            });
        }
    };



    return (
        <Fragment>
            <div className="patient-box" key={props.idUsuario}>
                <h3>{props.Nombre} {props.Apellidos}</h3>
                <p>Correo electrónico: {props.Email}</p>
                <p>Fecha de nacimiento: {props.Fecha_nac}</p>
                <a href={`/paciente/${props.idUsuario}`} onClick={handleVerPaciente}>
                    <button className="button-33">Ver paciente</button>
                </a>
            </div>
        </Fragment>
    );
}

export default Paciente;
