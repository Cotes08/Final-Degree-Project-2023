/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input } from 'reactstrap';
import Axios from 'axios';
import Mensaje from '../../../Mensaje';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../usrPsicologo/UiPsicologo.css';


const MensajesUsr = ({ modal, toggle, idUsuario, nombreUsuario, apellidosUsuario, idPsicologo, nombrePsicologo, apellidosPsicologo, emailPsicologo }) => {

    const [mensajes, setMensajes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [hayMensajes, setHayMensajes] = useState(false);
    const chatContainerRef = useRef(null);

    const cargarMensajes = () => {

        setHayMensajes(true);

        Axios.post('http://localhost:3001/getMensajesPsicologo', {
            idPaciente: idUsuario
        }).then((response) => {

            if (response.data.mensajes === true) {
                const mensajeDB = response.data.datos;
                const mensajesPorCargar = [];

                mensajeDB.forEach(mensaje => {
                    if (mensaje.idUsuario === idUsuario) {
                        const cargarMensaje = {
                            remitente: 'Tú',
                            texto: mensaje.mensaje,
                            esPsicologo: false,
                            fecha: new Date(mensaje.fecha_envio)
                        };
                        mensajesPorCargar.push(cargarMensaje);
                    } else if (mensaje.idUsuario === idPsicologo) {
                        const cargarMensaje = {
                            remitente: nombrePsicologo + " " + apellidosPsicologo,
                            texto: mensaje.mensaje,
                            esPsicologo: true,
                            fecha: new Date(mensaje.fecha_envio)
                        };
                        mensajesPorCargar.push(cargarMensaje);
                    }
                });

                setMensajes([...mensajes, ...mensajesPorCargar]);

            } else if (response.data.mensajes === false) {
                setHayMensajes(false);
            }
        });
    }

    useEffect(() => {
        if (modal === true) {
            cargarMensajes();
        } else {
            setMensajes([]);
            setMensaje('');
        }
    }, [modal]);

    useEffect(() => {
        if (chatContainerRef.current) {
            setTimeout(() => {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }, 0);
        }
    }, [mensajes]);

    const enviarMensaje = (e) => {
        setHayMensajes(true);
        e.preventDefault();

        const nuevoMensaje = {
            remitente: 'Tú',
            texto: mensaje,
            esPsicologo: false,
            fecha: new Date()
        };

        const fechaAux = new Date(nuevoMensaje.fecha.toISOString());
        fechaAux.setHours(fechaAux.getHours() + 2);
        const fechaFinal = fechaAux.toISOString().slice(0, 19).replace('T', ' ');

        Axios.post('http://localhost:3001/newMensajePsicologo', {
            idPaciente: idUsuario,
            mensaje: nuevoMensaje.texto,
            fecha: fechaFinal
        });

        setMensajes([...mensajes, nuevoMensaje]);
        setMensaje('');
    }

    return (
        <>
            <Html>
                <Modal isOpen={modal} toggle={toggle} className="custom-modal">
                    <Form onSubmit={enviarMensaje}>
                        <ModalHeader toggle={toggle}> <b>{nombreUsuario} {apellidosUsuario}</b></ModalHeader>
                        <ModalBody>
                            <Label for="email"><b>Nombre de tu psicólogo:</b> {nombrePsicologo} {apellidosPsicologo} </Label>
                            <br />
                            <Label for="email"><b>Correo de tu psicólogo:</b> {emailPsicologo} </Label>
                            <div className="chat-container-usr" ref={chatContainerRef}>
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
                            <Input
                                type="textarea"
                                name="mensaje"
                                id="mensaje"
                                value={mensaje}
                                required
                                className="custom-textarea"
                                onChange={(e) => setMensaje(e.target.value)}
                                placeholder="Escribe un mensaje"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary">Enviar mensaje</Button>
                            <Button color="secondary" onClick={toggle}>Salir</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Html>
        </>
    );
}

export default MensajesUsr;
