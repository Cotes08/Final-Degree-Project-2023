/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import IntroForm from "./Intro/IntroForm";
import Script from "./worldComp/Script";
import './Three.css';

//Lista de cancions
const songs = [
    './musica/song2.mp3',
    './musica/song3.mp3',
    './musica/song1.mp3',
];

//Este archivo contendra todas las escenas 3D
const Scene = () => {


    //Variable de navegacion de router-dom
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;//Es obligatorio que este esto ya que si no se pone no podremos ver si hay una sesion activa

    //Esta puesto en false para cuando se inicie no siempre salga, que solo salga si el usuario no ha hecho la introduccion
    const [showIntro, setShowIntro] = useState(false);
    const [idUsuario, setIdUsuario] = useState('');
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    useEffect(() => {

        Axios.get('http://localhost:3001/loginUsr').then((response) => {
            if (response.data.loggedIn === true && response.data.user.Psicologo === false) {

                setIdUsuario(response.data.user.Id);

                let Id = response.data.user.Id;

                Axios.post('http://localhost:3001/getPerfilUsr', {

                    idUsuario: Id

                }).then((response) => {

                    if (!response.data.perfil) {
                        setShowIntro(true);
                    }
                });

            } else if (response.data.loggedIn === true && response.data.user.Psicologo === true) {

                navigate('/logeadoPsico');

            } else {

                navigate('/');

            }
        });


    }, [showIntro]);



    return (
        <Fragment>
            <audio id="audio" src={songs[currentSongIndex]} loop />
            {/* Si el usuario no ha hecho la introduccion tendra que hacerla, una vez la tenga hecha cargara directamente el mundo */}
            {showIntro && <IntroForm idUsuario={idUsuario} setShowIntro={setShowIntro} />}
            {!showIntro && (
                <div className="mundo3D" >
                    <Script idUsuario={idUsuario} songs={songs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} /> {/* Le pasamos el id del usuario porque le hace falta */}
                </div>
            )}
        </Fragment>
    )
}

export default Scene