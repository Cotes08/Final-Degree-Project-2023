import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Html } from '@react-three/drei';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../usrPsicologo/UiPsicologo.css';



const ConfirmCerrarSesion = ({ modal, toggle }) => {


    //Variable de navegacion de router-dom
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;//Es obligatorio que este esto ya que si no se pone no podremos ver si hay una sesion activa

    const stiloModal = {

        marginTop: '15%',
    }

    const cerrarSesion = () => {

        Axios.get('http://localhost:3001/logout').then(() => {
            navigate('/');
        });
    }

    return (
        <>
            <Html>
                <Modal isOpen={modal} toggle={toggle} style={stiloModal}>
                    <ModalHeader toggle={toggle}>Vas a cerrar sesión, deseas hacerlo?</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={cerrarSesion}>Si, cerrar sesión</Button>
                        <Button color="secondary" onClick={toggle}>No, no quiero cerrar sesión</Button>
                    </ModalFooter>
                </Modal>
            </Html>
        </>
    );
}

export default ConfirmCerrarSesion;
