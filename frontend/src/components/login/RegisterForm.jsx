import React, { Fragment, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import "./RegisterForm.css";




const RegisterForm = () => {


    //Para navegar entre paginas
    const navigate = useNavigate();


    //Creamos las variables que necesitemos para usuario
    const [regNombre, setRegNombre] = useState('');
    const [regApellidos, setRegApellidos] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regContraseña, setRegContraseña] = useState('');
    const [regFecha_nac, setRegFecha_nac] = useState('');
    const [regCodPsicologo, setRegCodPsicologo] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [checkConsentimiento, setCheckConsentimiento] = useState(false);


    //Control del formulario de registro
    const [mostrarCampos, setMostrarCampos] = useState(false);
    const [edad, setEdad] = useState('');
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const handleCheckbox = (e) => {
        setMostrarCampos(e.target.checked);
        if (!e.target.checked) {
            setRegCodPsicologo('');
        }
    }

    //Calculamos la edad para la BD
    const calcularEdad = () => {

        const fecha_nac = new Date(regFecha_nac);
        const hoy = new Date();
        const difAnyos = hoy.getFullYear() - fecha_nac.getFullYear();

        if (hoy.getMonth() < fecha_nac.getMonth() || (hoy.getMonth() === fecha_nac.getMonth() && hoy.getDate() < fecha_nac.getDate())) {
            setEdad(difAnyos - 1);

        } else {
            setEdad(difAnyos);
        }
    };

    //Abre el consentimiento informado
    const handleConsentimiento = (e) => {
        setModalOpen(true);
    };

    //Cierra el consentimiento informado y marca a true la opcion
    const handleConfirmConsentimiento = () => {
        setModalOpen(false);
        setCheckConsentimiento(true);
    };


    //Creamos una funcion que usa el plugin Axios, el cual se encarga de pasarle la info al backend
    const register = (e) => {

        e.preventDefault();

        if (checkConsentimiento) {
            if (edad > 14) {
                if (validPasswordRegex.test(regContraseña)) {

                    if ((regCodPsicologo === '' && !mostrarCampos) || regCodPsicologo === 'M-12345-A') {

                        Axios.post('http://localhost:3001/registrUsr', {
                            nombre: regNombre,
                            apellidos: regApellidos,
                            email: regEmail,
                            contraseña: regContraseña,
                            fecha_nac: regFecha_nac,
                            codigo_psicologo: regCodPsicologo
                        }).then((response) => {

                            if (response.data === 'ER_DUP_ENTRY') {
                                swal.fire('Correo electrónico ya existente', '', 'error');

                            } else if (response.data === 'Log_OK') {
                                navigate('/');
                            }
                        });
                    } else {
                        swal.fire('Debes escribir un numero de colegiado valido', '', 'error');
                    }
                } else {
                    swal.fire('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial', '', 'error');
                }
            } else {
                swal.fire('Debes ser mayor de 15 años para registrarte', '', 'error');
            }
        } else {
            swal.fire('Debes aceptar el consentimiento informado', '', 'error');
        }
    };

    const handleVolver = () => {
        navigate('/');
    }

    return (
        <>
            <button className="button-back" onClick={handleVolver}>
                {/* ícono de flecha hacia la izquierda */}
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
            </button>

            <form className="register-form" onSubmit={register}>
                <h1>Registrarme</h1>
                <div className="content">
                    <div className="input-field">
                        <label>Nombre:</label>
                        <input type="text" value={regNombre} placeholder="Nombre" required onChange={(e) => {
                            setRegNombre(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                        }} />
                    </div>

                    <div className="input-field">
                        <label>Apellidos:</label>
                        <input type="text" value={regApellidos} placeholder="Apellidos" required onChange={(e) => {
                            setRegApellidos(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                        }} />
                    </div>

                    <div className="input-field">
                        <label>Email:</label>
                        <input type="email" value={regEmail} placeholder="Email" required onChange={(e) => {
                            setRegEmail(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                        }} />
                    </div>

                    <div className="input-field">
                        <label>Contraseña:</label>
                        <input type="password" value={regContraseña} placeholder="Password" required onChange={(e) => {
                            setRegContraseña(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                        }} />
                    </div>

                    <div className="input-field">
                        <label>Fecha de nacimiento:</label>
                        <input type="date" value={regFecha_nac} required onChange={(e) => {
                            setRegFecha_nac(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                        }} />
                    </div>

                    <div>
                        <label className='texto-checkbox'>
                            Consentimiento informado:
                            <input className='checkbox-psicologo' type="checkbox" onChange={handleConsentimiento} checked={checkConsentimiento} />
                        </label>
                    </div>

                    <div>
                        <label className='texto-checkbox'>
                            Soy psicólogo:
                            <input className='checkbox-psicologo' type="checkbox" onChange={(e) => {
                                handleCheckbox(e);
                            }} />
                        </label>
                    </div>

                    {mostrarCampos &&
                        <div className="input-field">
                            <label >Licencia de psicología:</label>
                            <input type="text" value={regCodPsicologo} placeholder="Licencia de psicología" onChange={(e) => {
                                setRegCodPsicologo(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                            }} />
                        </div>
                    }
                </div>

                <div className="action">
                    <button type='submit' onClick={calcularEdad}>Registrarme</button>{/* Cuando se haga click en el boton se ejecutara la funcion register  */}
                </div>
            </form>
            {/* Se abre solo si esta marcado el consentimiento informado */}
            <Modal isOpen={modalOpen} style={{ maxWidth: "50%", marginTop: "4%" }}>
                <ModalHeader><strong>Consentimiento informado Here&Now</strong></ModalHeader>
                <ModalBody className='modal-body'>
                    Querido/a usuario/a,
                    Antes de utilizar esta página web con objetivos psicoterapéuticos, diseñada para reducir síntomas emocionales, es conveniente que leas y comprendas atentamente este consentimiento informado para que sea consciente de su uso y
                    confidencialidad de sus datos teniendo en cuenta tanto sus beneficios como sus posibles riesgos asociados,
                    además de sus derechos y compromisos respecto al uso de nuestra página web.
                    <ul>
                        <li>
                            <strong>1. USO Y CONFIDENCIALIDAD DE SUS DATOS: </strong>
                            Toda la información recogida, tanto de los resultados de las sesiones como de los registros son confidenciales y no serán divulgadas
                            a ninguna otra persona que no sea su profesional de salud mental de referencia.
                            Debe tener en cuenta que, según la ley 1090 del 2006, la información psicológica confidencial podrá ser desvelada
                            en caso de que se presente situaciones que pongan en grave peligro su integridad psíquica y/o física o de alguna otra persona implicada.
                        </li>

                        <li>
                            <strong>2. BENEFICIOS DE LA APLICACIÓN WEB PSICOLÓGICA: </strong>
                            Se espera con esta aplicación el aumento del bienestar y la reducción de síntomas de depresión y ansiedad al
                            utilizarla de forma consistente. A través de esta aplicación tendrás acceso a recursos y técnicas respaldados
                            por la investigación científica, como técnicas de relajación, de meditación y de respiración, actividades dinámicas
                            para el autoconocimiento, y seguimiento del estado emocional, para ofrecerte herramientas de autocuidado,
                            y afrontamiento a ciertas situaciones del día a día.
                        </li>

                        <li>
                            <strong>3. LIMITACIONES DE LA APLICACIÓN WEB PSICOLÓGICA: </strong>
                            Es conveniente informar que el uso de esta aplicación web no sustituye la psicoterapia convencional con su profesional
                            de salud mental ni la relación terapéutica cara a cara, pero sí servirse como una herramienta de apoyo.
                            Si está experimentando síntomas de depresión o ansiedad más graves, le recomendamos que lo consulte con su
                            profesional de salud mental de referencia.
                        </li>

                        <li>
                            <strong>4. CONFIDENCIALIDAD Y PRIVACIDAD: </strong>
                            Valoramos y respetamos tu privacidad. Toda la información recogida en esta aplicación
                            web serán tratados confidencialmente y su recogida se utilizará únicamente para informar a su profesional
                            de salud mental de referencia sobre sus avances y cumplimiento de objetivos terapéuticos.
                            Se tomará todas las medidas razonables para garantizar su seguridad,
                            sin embargo, se debe tener en cuenta que la transmisión de datos a través de Internet conlleva ciertos riesgos,
                            por lo que no se puede garantizar la seguridad absoluta de sus datos.
                        </li>

                        <li>
                            <strong>5. DERECHOS Y COMPROMISO: </strong>
                            Debe saber que el uso de esta aplicación web es de uso voluntario. Es usted responsable de la manera de utilizarla.
                            La utilización de la Aplicación Web psicológica requiere de su compromiso de asistencia,
                            participación y honestidad y si en algún momento durante el uso de la aplicación web decides no continuar porque
                            te sientes incómodo/a o experimentas efectos negativos, te recomendamos que lo consultes con tu profesional de
                            salud mental de referencia para suspender su uso.
                        </li>

                        <li>
                            <strong>6. DECLARACIÓN DE CONSENTIMIENTO: </strong>
                            Al darle clic en esta casilla estará certificando que ha sido informado/a con la claridad y veracidad,
                            y que actúa consecuentemente, libre y voluntariamente en esta aplicación web como participante activo/a.
                            Además de que ha sido informado/a de que puede retirarse u oponerse cuando usted desee informando a su
                            profesional de salud mental de referencia.
                        </li>

                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleConfirmConsentimiento}>Acepto el consentimiento</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default RegisterForm;