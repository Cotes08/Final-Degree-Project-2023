/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input } from 'reactstrap';
import Axios from 'axios';
import swal from 'sweetalert2';
import Paciente from './Paciente';
import 'bootstrap/dist/css/bootstrap.css';
import './UiPsicologo.css';

const UiPsicologo = () => {

    //Para poder obtener la cookie del usuario
    Axios.defaults.withCredentials = true;

    //Para poder navegar entre paginas
    const navigate = useNavigate();


    const [componente, setComponente] = useState([]);//Para poder añadir el componente pacientes
    const [usuarioPsicologo, setUsuarioPsicologo] = useState('');
    const [emailPsicologo, setEmailPsicologo] = useState('');
    const [idPsicologo, setIdPsicologo] = useState('');
    const [emailPaciente, setEmailPaciente] = useState('');
    const [cargarPacientes, setCargarPaciente] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    //Esto se ejecutara cada vez que se haya cargado el login entero
    useEffect(() => {

        Axios.get('http://localhost:3001/loginUsr').then((response) => {
            if (response.data.loggedIn === true && response.data.user.Psicologo === true) {

                setUsuarioPsicologo(response.data.user.Nombre + " " + response.data.user.Apellidos);
                setEmailPsicologo(response.data.user.Email);
                setIdPsicologo(response.data.user.Id);
                setCargarPaciente(true);

            } else {

                navigate('/');
            }
        });
    }, []);


    //De esta forma se obtienen los pacientes del psicologo
    const getPacientes = () => {

        Axios.post('http://localhost:3001/getPatient', {
            idPsicologo: idPsicologo
        }).then((response) => {
            if (response.data.get === 'OK') {
                const pacientes = response.data.pacientes;
                const pacientesComponente = pacientes.map((paciente) => {
                    const fecha = new Date(paciente.fecha_nac);
                    return (
                        <Paciente
                            key={paciente.idUsuario}
                            idUsuario={paciente.idUsuario}
                            Nombre={paciente.nombre}
                            Apellidos={paciente.apellidos}
                            Email={paciente.email}
                            Fecha_nac={fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()}
                            idPsicologo={idPsicologo} />
                    );
                });
                setComponente([...componente, pacientesComponente]);
            }
        });
    };

    //Con esto nos aseguramos de que se carguen los pacientes solo una vez
    if (cargarPacientes === true) {

        getPacientes();
        setCargarPaciente(false);
    }



    //Funcion para añadir un paciente
    const addPaciente = (e) => {

        toggle();//Cerramos el popup
        e.preventDefault();

        Axios.post('http://localhost:3001/newPatient', {
            email: emailPaciente,
            idPsicologo: idPsicologo
        }).then((response) => {

            if (response.data.err === 'ER_DUP_ENTRY') {
                swal.fire('El paciente ya tiene un psicologo asociado', '', 'error');

            } else if (response.data.insert === 'OK') {

                swal.fire({
                    title: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                })/* .then(()=>{window.location.reload();}); */


                const fecha = new Date(response.data.paciente[0].fecha_nac);

                //Aqui se hara la peticion de la base de datos para obtener los pacientes del psicologo
                const paciente = (
                    <Paciente
                        key={response.data.paciente[0].idUsuario}
                        idUsuario={response.data.paciente[0].idUsuario}
                        Nombre={response.data.paciente[0].nombre}
                        Apellidos={response.data.paciente[0].apellidos}
                        Email={response.data.paciente[0].email}
                        Fecha_nac={fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()}
                        idPsicologo={idPsicologo} />);

                setComponente([...componente, paciente]);

            } else if (response.data.insert === 'KO') {

                swal.fire(response.data.message, '', 'error');
            }
        });

    };


    return (
        <Fragment>
            <div className="container">
                <h1>Perfil del Psicólogo</h1>
                <div className="psychologist-info">
                    <p>Nombre: <strong>{usuarioPsicologo}</strong></p>
                    <p>Correo electrónico: {emailPsicologo}</p>
                </div>
            </div>
            <div className='pacientes'>
                <h2>Mis pacientes</h2>
                <div className="patient-info">

                    {componente}

                    <div className="patient-box">
                        <button className="button-33" onClick={toggle}>Añadir paciente</button>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <Form onSubmit={addPaciente}>
                    <ModalHeader toggle={toggle}>Introduce el correo del paciente</ModalHeader>

                    <ModalBody>
                        <Label for="nombre">Correo</Label>
                        <Input type="email" name="email" id="email" required placeholder="Correo electronico del paciente" onChange={(e) => {
                            setEmailPaciente(e.target.value);
                        }} />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" type='submit'>Guardar</Button>
                        <Button color="secondary" onClick={toggle}>Cancelar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </Fragment>
    );
};

export default UiPsicologo;