/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SesionesPaciente from './SesionesPaciente/SesionesPaciente';
import Axios from 'axios';
import Mensaje from '../Mensaje';
import 'bootstrap/dist/css/bootstrap.css';
import './UiPsicologo.css';

const DatosPaciente = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [mensajes, setMensajes] = useState([]);//Array de mensajes
    const [mensaje, setMensaje] = useState('');//Mensaje que se va a enviar
    const [hayMensajes, setHayMensajes] = useState(false);//Para saber si hay mensajes
    const chatContainerRef = useRef(null);
    const [sesionesDepresion, setSesionesDepresion] = useState([]);

    let paciente;
    if (location.state && location.state.paciente) {
        paciente = location.state.paciente;
    } else {
        const storedPaciente = localStorage.getItem('datosPaciente');
        if (storedPaciente) {
            const paciente = JSON.parse(storedPaciente);
            localStorage.removeItem('datosPaciente');
        }
    }

    useEffect(() => {

        Axios.post('http://localhost:3001/getDataSesionesPaciente', {

            idPaciente: paciente.idUsuario
        }).then((response) => {

            if (response.data) {
                const sesionesDepresion = response.data.map(sesion => ({
                    datos_sesion: sesion.datos_sesion,
                    cuestionario: sesion.cuestionario
                })); 

                setSesionesDepresion(sesionesDepresion);
            }
        });
    }, [paciente.idUsuario]);



    useEffect(() => {
        if (paciente !== null) {
            cargarMensajes();
        }
    }, [paciente]);

    useEffect(() => {
        if (chatContainerRef.current) {
            setTimeout(() => {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
            }, 0);
        }
    }, [mensajes]);


    const cargarMensajes = () => {
        setHayMensajes(true);

        //Cargamos los mensajes del chat
        Axios.post('http://localhost:3001/getMensajesPsicologo', {
            idPaciente: paciente.idUsuario
        }).then((response) => {

            if (response.data.mensajes === true) {

                const mensajeDB = response.data.datos;

                const mensajesPorCargar = [];//Array para cargar los mensajes

                mensajeDB.forEach(mensaje => {

                    if (mensaje.idUsuario === paciente.idUsuario) {
                        const cargarMensaje = {
                            remitente: paciente.Nombre + " " + paciente.Apellidos,
                            texto: mensaje.mensaje,
                            esPsicologo: false,//Enviado por el paciente
                            fecha: new Date(mensaje.fecha_envio)
                        };

                        mensajesPorCargar.push(cargarMensaje);//Añadimos el mensaje al array

                    } else if (mensaje.idUsuario === paciente.idPsicologo) {
                        const cargarMensaje = {
                            remitente: 'Tú',
                            texto: mensaje.mensaje,
                            esPsicologo: true,//Enviado por el paciente
                            fecha: new Date(mensaje.fecha_envio)
                        };

                        mensajesPorCargar.push(cargarMensaje);
                    }
                });

                setMensajes([...mensajes, ...mensajesPorCargar]);//Añadimos los mensajes al array de mensajes

            } else if (response.data.mensajes === false) {
                setHayMensajes(false);
            }

        });
    }


    const enviarMensaje = (e) => {

        setHayMensajes(true);

        e.preventDefault();

        const nuevoMensaje = {
            remitente: 'Tú',
            texto: mensaje,
            esPsicologo: true,//Enviado por el psicologo
            fecha: new Date()
        };

        const fechaAux = new Date(nuevoMensaje.fecha.toISOString());
        fechaAux.setHours(fechaAux.getHours() + 2);
        const fechaFinal = fechaAux.toISOString().slice(0, 19).replace('T', ' ');

        Axios.post('http://localhost:3001/newMensajePsicologo', {
            idPsicologo: paciente.idPsicologo,
            idPaciente: paciente.idUsuario,
            mensaje: nuevoMensaje.texto,
            fecha: fechaFinal
        });

        setMensajes([...mensajes, nuevoMensaje]);
        setMensaje('');
    }


    const handleVolver = () => {
        navigate('/logeadoPsico')
    }


    return (
        <>
            <button className="button-back" onClick={handleVolver}>
                {/* ícono de flecha hacia la izquierda */}
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
            </button>
            <div className="custom-chat">
                <form onSubmit={enviarMensaje}>
                    <div className="custom-chat-header">
                        <b>{paciente.Nombre} {paciente.Apellidos}</b>
                    </div>
                    <div className="custom-chat-body">
                        <label htmlFor="email"><b>Correo:</b> {paciente.Email} </label>
                        <br />
                        <label htmlFor="fecha_nac"><b>Fecha de nacimiento:</b> {paciente.Fecha_nac} </label>
                        <br />
                        <div className="body-container">
                            <div className="chat-section">
                                <div className="chat-container" ref={chatContainerRef}>
                                    {hayMensajes === true ? (
                                        <div className='mensajes-container'>
                                            {mensajes.map((mensaje, index) => (
                                                <Mensaje
                                                    key={index}
                                                    remitente={mensaje.remitente}
                                                    texto={mensaje.texto}
                                                    esPsicologo={mensaje.esPsicologo}
                                                    fecha={mensaje.fecha} />
                                            ))}
                                        </div>
                                    ) : (<div className="no-mensajes">No hay mensajes</div>)}
                                </div>

                                <textarea
                                    name="mensaje"
                                    id="mensaje"
                                    value={mensaje}
                                    required
                                    className="form-control custom-textarea"
                                    onChange={(e) => setMensaje(e.target.value)}
                                    placeholder="Escribe un mensaje" />

                                <div className="custom-chat-footer">
                                    <button className="btn btn-success btn-light-success" type="submit">Enviar mensaje</button>
                                </div>
                            </div>
                            <SesionesPaciente sesionesDepresion={sesionesDepresion} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default DatosPaciente;
