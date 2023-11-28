import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert2';
import "./LoginForm.css";

const LoginForm = () => {


    //Variable de navegacion de router-dom
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;//Es obligatorio que este esto ya que si no se pone no podremos ver si hay una sesion activa


    //Creamos las variables que necesitemos
    const [logEmail, setLogEmail] = useState('');
    const [logContraseña, setLogContraseña] = useState('');
    const [codPsicologo, setcodPsicologo] = useState('');
    const [mostrarCampos, setMostrarCampos] = useState(false);


    //Creamos una funcion que se encarga de controlar el checkbox
    const handleCheckbox = (e) => {
        setMostrarCampos(e.target.checked);
        if (!e.target.checked) {
            setcodPsicologo('');
        }
    }


    //Creamos una funcion que usa el plugin Axios, el cual se encarga de pasarle la info al backend
    const login = (e) => {

        e.preventDefault();

        if (codPsicologo === '' && mostrarCampos) {
            swal.fire('Debes escribir un numero de colegiado valido', '', 'error');
            //alert('Debes escribir un numero de colegiado valido');
        }
        else {
            //Enviamos los datos para el login
            Axios.post('http://localhost:3001/loginUsr', {
                email: logEmail,
                contraseña: logContraseña,
                codigo_psicologo: codPsicologo
            }).then((response) => {

                if (response.data.message) {
                    swal.fire(response.data.message, '', 'error');
                }
                else {
                    //En el caso de una cosa u otra vamos al psicologo o al usuario
                    if (response.data.Psicologo === true) {
                        navigate('/logeadoPsico');

                    } else if (response.data.Psicologo === false) {
                        navigate('/logeadoUser');
                    }
                }
            });
        }
    };

    const goregister = () => {
        navigate('/register');
    };

    //Esto se ejecutara cada vez que se haya cargado el login entero
    useEffect(() => {
        Axios.get('http://localhost:3001/loginUsr').then((response) => {

            if (response.data.loggedIn === true && response.data.user.Psicologo === false) {

                navigate('/logeadoUser');

            } else if (response.data.loggedIn === true && response.data.user.Psicologo === true) {

                navigate('/logeadoPsico');

            }
        });
    });

    return (
        <Fragment>
            <form className="login-form" onSubmit={login}>
                <h1>Iniciar Sesión</h1>
                <div className="content">
                    <div className="input-field">
                        <input type="email" value={logEmail} required placeholder="Email" onChange={(e) => {
                            setLogEmail(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                        }} />
                    </div>

                    <div className="input-field">
                        <input type="password" value={logContraseña} required placeholder="Password" onChange={(e) => {
                            setLogContraseña(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                        }} />
                    </div>

                    <div>
                        <label className='texto-checkbox'>
                            Soy psicólogo:
                            <input className='checkbox-psicologo' type="checkbox" onChange={handleCheckbox} />
                        </label>
                    </div>
                    {mostrarCampos &&
                        <div className="input-field">
                            <input type="text" value={codPsicologo} placeholder="Licencia de psicología" onChange={(e) => {
                                setcodPsicologo(e.target.value);//Registramos el cambio en los input y lo guardamos en las variables
                            }} />
                        </div>
                    }

                    <a href="a" className="link">He olvidado mi contraseña</a>
                </div>

                <div className="action">
                    <button onClick={goregister}>Registrarme</button>
                    <button type='submit'>Iniciar Sesión</button>
                </div>

            </form>
        </Fragment>
    )
}

export default LoginForm;