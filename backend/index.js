const express = require('express');//Metemos dentro de la variable express la funcionalidad del plugin express y luego la pasamos a app.
const mysql = require('mysql');//metemos dentro de mysql la funcionalidad del pulgin mysql
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const saltRounds = 10;
const app = express();

//Esto parseara automaticamte todo lo que recibamos
app.use(express.json());

//Modificamos cors para tener una mejor conexion frontend backend para poder usar todo el tema de sesiones y cookies
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true /* habilitamos el uso de cookies IMPORTANTE */
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//Para inicializar la sesion hay que hacer lo siguiente
app.use(session({
    key: "activerUsr",
    secret: "secreto" /* Esto es extremadamente importante ya que es la seguridad de la cookieParser, en este caso no importa pero se debe poner algo mas seguro */,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,//Timepo de vida de la cookie

    },
}));


//Establecemos la conexion con la base de datos y la guardamos dentro de db
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "admin1234",
    database: "database"
});


//Realizamos un post al servidor express para resgistrar a un usuario
app.post('/registrUsr', (req, res) => {

    //Recibimos las variables que axios nos ha pasado
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const email = req.body.email;
    const contraseña = req.body.contraseña;
    const fecha_nac = req.body.fecha_nac;
    const cod_psicologo = req.body.codigo_psicologo;

    console.log(cod_psicologo);

    ///Nos aseguramos de que la contraseña esta encryptada
    bcrypt.hash(contraseña, saltRounds, (err, hash) => {

        //realizamos una querry de registro de usuario y en lugar de pasarle la var contraseña le pasamos la variable con la contraseña encriptada
        db.query("INSERT INTO usuario (nombre, apellidos, email, contraseña, fecha_nac) VALUES(?, ?, ?, ?, ?)",
            [nombre, apellidos, email, hash, fecha_nac],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(err.code);

                } else {
                    console.log('Se ha insertado correctamente');
                    res.send('Log_OK');

                    if (cod_psicologo != "") {

                        db.query("INSERT INTO psicologo (idPsicologo, codigo_psicologo) VALUES(?, ?)",
                            [result.insertId, cod_psicologo],
                            (err) => {
                                if (err) {
                                    console.log(err);

                                } else {
                                    console.log('Se ha insertado correctamente el usuario psicólogo');
                                }
                            });
                    }

                }

            });
    });



});


//Para poder comprobar si hay una sesion con un usuario, importante
app.get('/loginUsr', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
})



//Peticion de inicio de sesion de un usuario
app.post('/loginUsr', (req, res) => {

    //Recibimos las variables que axios nos ha pasado
    const email = req.body.email;
    const contraseña = req.body.contraseña;
    const cod_psicologo = req.body.codigo_psicologo;

    //realizamos una querry de registro de usuario
    db.query("SELECT * FROM usuario WHERE email = ? ", email,
        (err, resultUsr) => {

            if (resultUsr.length > 0) {
                bcrypt.compare(contraseña, resultUsr[0].contraseña, (err, response) => {
                    if (response) {

                        db.query("SELECT * FROM psicologo WHERE idPsicologo = ?",
                            [resultUsr[0].idUsuario],
                            (err, resultPsico) => {
                                if (err) {
                                    res.send({ err: err });

                                } else if (resultPsico.length > 0) {

                                    if (resultPsico[0].idPsicologo === resultUsr[0].idUsuario) {

                                        if (cod_psicologo === resultPsico[0].codigo_psicologo) {

                                            let datosPsico = { Nombre: resultUsr[0].nombre, Apellidos: resultUsr[0].apellidos, Email: resultUsr[0].email, Id: resultUsr[0].idUsuario, Psicologo: true };
                                            req.session.user = datosPsico;
                                            res.send(datosPsico);
                                        } else if (cod_psicologo === "") {
                                            res.send({ message: 'Debe introducir el número de colegiado' });
                                        } else {
                                            res.send({ message: 'Numero de colegiado incorrecto' });
                                        }
                                    } else {
                                        if (cod_psicologo === resultPsico[0].codigo_psicologo) {
                                            res.send({ message: 'No está registrado como usuario psicólogo' });
                                        }
                                    }
                                } else {
                                    if (cod_psicologo == '') {

                                        db.query("SELECT COUNT(idPaciente) as Paciente FROM paciente WHERE idPaciente = ?", resultUsr[0].idUsuario,
                                            (err, resultPaciente) => {

                                                if (resultPaciente[0].Paciente === 1) {
                                                    let datosUsr = { Nombre: resultUsr[0].nombre, Apellidos: resultUsr[0].apellidos, Email: resultUsr[0].email, Id: resultUsr[0].idUsuario, Psicologo: false };
                                                    req.session.user = datosUsr;
                                                    res.send(datosUsr);
                                                } else {
                                                    res.send({ message: 'No tienes ningún psicólogo asociado, debe tener uno para poder entrar' });
                                                }
                                            });
                                    } else {
                                        res.send({ message: 'No está registrado como usuario psicólogo' });
                                    }
                                }
                            });
                    }
                    else {
                        res.send({ message: 'Contraseña incorrecta' });
                    }
                });
            } else {
                res.send({ message: 'Correo electrónico no registrado' });
            }
        });
});


//Peticion de nuevo paciente para el psicologo
app.post('/newPatient', (req, res) => {

    //Recibimos las variables que axios nos ha pasado
    const email = req.body.email;
    const idPsicologo = req.body.idPsicologo;

    db.query("SELECT idUsuario, nombre, apellidos, email, fecha_nac FROM usuario WHERE email = ?" +
        "AND idUsuario NOT IN (SELECT idPsicologo FROM psicologo)", email,
        (err, resultUsrPaciente) => {

            if (resultUsrPaciente.length > 0) {

                db.query("INSERT INTO paciente (idPaciente, idPsicologo) VALUES(?, ?)",
                    [resultUsrPaciente[0].idUsuario, idPsicologo],
                    (err) => {
                        if (err) {

                            res.send({ err: err.code });

                        } else {

                            db.query("INSERT INTO tablon (idPaciente) VALUES (?)",
                                resultUsrPaciente[0].idUsuario,
                                (err) => {

                                    if (err) {
                                        res.send({ err: err.code });

                                    } else {
                                        res.send({ message: 'Paciente añadido correctamente', insert: 'OK', paciente: resultUsrPaciente });

                                    }
                                });
                        }
                    });
            } else {
                res.send({ message: 'El usuario debe registrarse previamente para poder introducirlo como paciente', insert: 'KO' });

            }
        });
});


//Obtener los pacientes de un psicologo
app.post('/getPatient', (req, res) => {

    //Recibimos las variables que axios nos ha pasado
    const idPsicologo = req.body.idPsicologo;

    db.query("SELECT u.idUsuario, u.nombre, u.apellidos, u.email, u.fecha_nac " +
        "FROM usuario u " +
        "JOIN paciente p on u.idUsuario = p.idPaciente " +
        "WHERE p.idPsicologo = ? ", idPsicologo,
        (err, resultGetPaciente) => {

            if (err) {
                console.log(err);

            } else if (resultGetPaciente.length > 0) {
                res.send({ get: 'OK', pacientes: resultGetPaciente });

            }
        });
});



//Gestion de mensajes

//Crear un nuevo mensaje
app.post('/newMensajePsicologo', (req) => {

    //Recibimos las variables que axios nos ha pasado
    const idPsicologo = req.body.idPsicologo;
    const idPaciente = req.body.idPaciente;
    const mensaje = req.body.mensaje;
    const fecha = req.body.fecha;

    db.query("SELECT idTablon FROM tablon WHERE idPaciente = ?", idPaciente,
        (err, resultIdTablon) => {

            if (err) {
                console.log(err);

            } else {
                const idTablon = resultIdTablon[0].idTablon;

                if (idPsicologo === undefined) {
                    db.query("INSERT INTO mensaje (idUsuario, idTablon, fecha_envio, mensaje) VALUES(?, ?, ?, ?)",
                        [idPaciente, idTablon, fecha, mensaje],
                        (err) => {
                            if (err) {
                                console.log(err);

                            }
                        });
                } else {
                    db.query("INSERT INTO mensaje (idUsuario, idTablon, fecha_envio, mensaje) VALUES(?, ?, ?, ?)",
                        [idPsicologo, idTablon, fecha, mensaje],
                        (err) => {
                            if (err) {
                                console.log(err);

                            }
                        });

                }
            }
        });
});

//Obtener los mensajes de un paciente
app.post('/getMensajesPsicologo', (req, res) => {

    //Recibimos las variables que axios nos ha pasado
    const idPaciente = req.body.idPaciente;

    db.query("SELECT idTablon FROM tablon WHERE idPaciente = ?", idPaciente,
        (err, resultIdTablon) => {
            if (err) {
                console.log(err);

            } else {
                db.query("SELECT idUsuario, fecha_envio, mensaje FROM mensaje WHERE idTablon = ? ORDER BY fecha_envio", resultIdTablon[0].idTablon,
                    (err, resultMensajesUsr) => {
                        if (err) {
                            console.log(err);

                        } else {
                            if (resultMensajesUsr.length > 0) {
                                res.send({ mensajes: true, datos: resultMensajesUsr });
                            } else {
                                res.send({ mensajes: false, datos: resultMensajesUsr });
                            }
                        }
                    });
            }
        });

});



//Crear el perfil del usuario
app.post('/newPerfilUsr', (req) => {

    //Recibimos las variables que axios nos ha pasado
    const idUsuario = req.body.idUsuario;
    const apodo = req.body.apodo;
    const genero = req.body.genero;
    const disponibilidad = req.body.disponibilidad;
    const color = req.body.color;


    db.query("INSERT INTO PERFIL (idPerfil, apodo, genero, disponibilidad,  color) VALUES(?, ?, ?, ?, ?)",
        [idUsuario, apodo, genero, disponibilidad, color],
        (err) => {
            if (err) {
                console.log(err);
            }
        });

});

//Comprobamos si tiene perfil el usuario
app.post('/getPerfilUsr', (req, res) => {

    const idUsuario = req.body.idUsuario;

    db.query("SELECT COUNT(*) as count FROM perfil WHERE idPerfil = ?", idUsuario,
        (err, resultPerfilUsr) => {

            if (err) {
                console.log(err);

            } else {
                if (resultPerfilUsr[0].count > 0) {
                    res.send({ perfil: true });
                } else {
                    res.send({ perfil: false });
                }
            }
        });
});


//Comprobamos si hay una sesion activa
app.post('/checkSesionActiva', (req, res) => {

    const idUsuario = req.body.idUsuario;

    db.query("SELECT sesion_idSesion, sesion_idSesion FROM sesion_activa WHERE paciente_idPaciente = ?", idUsuario,
        (err, resultSesionActiva) => {

            if (err) {
                console.log(err);

            } else {
                if (resultSesionActiva.length > 0) {
                    res.send({ SesionActiva: true, idSesion: resultSesionActiva[0].sesion_idSesion });
                } else {
                    res.send({ SesionActiva: false });
                }
            }
        });
});


//Llamada que se hara cuando escoja alguna sesion en concreto
app.post('/newActiveSesion', (req) => {

    const idUsuario = req.body.idUsuario;
    const tipo = req.body.tipo;

    db.query("SELECT idSesion FROM sesion WHERE tipo = ? ORDER BY orden_sesion", tipo,
        (err, resultNuevaSesionActiva) => {

            if (err) {
                console.log(err);

            } else {

                db.query("INSERT INTO sesion_activa (paciente_idPaciente, sesion_idSesion) VALUES(?, ?)",
                    [idUsuario, resultNuevaSesionActiva[0].idSesion],
                    (error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
            }
        });
});



//Al elegir una sesion, se crea una sesion activa para el usuario
app.post('/getPreguntasDepresion', (req, res) => {

    const cuestionario = req.body.cuestionario;
    const idSesion = req.body.idSesion;

    db.query("SELECT P.pregunta, O.opcion, P.idPregunta FROM pregunta P " +
        "JOIN opcion O ON P.idPregunta = O.idPregunta " +
        "JOIN cuestionario C ON P.idCuestionario = C.idCuestionario " +
        "JOIN sesion_con_cuestionario SC ON C.idCuestionario = SC.cuestionario_idCuestionario " +
        "WHERE C.nombre = ? AND SC.sesion_idSesion = ? " +
        "ORDER BY P.orden",
        [cuestionario, idSesion],
        (err, resultFromDepresion) => {

            if (err) {
                console.log(err);

            } else {

                res.send({ Preguntas: resultFromDepresion });

            }
        });

});


//Subimos las respuestas de los cuestionarios
app.post('/subirAnswersForm', (req) => {

    const idUsuario = req.body.idUsuario;
    const respuestas = req.body.respuestas;
    const idPregunta = req.body.idPregunta;

    for (let i = 0; i < respuestas.length; i++) {

        db.query("INSERT INTO respuesta (idPaciente, idPregunta, respuesta) VALUES(?, ?, ?)",
            [idUsuario, idPregunta[i], respuestas[i]],
            (error) => {
                if (error) {
                    console.log(error);
                }
            });
    }
});


//Obtenemos el pefil del usuario para personalizar los estilos
app.post('/getDataPerfil', (req, res) => {

    const idUsuario = req.body.idUsuario;

    db.query("SELECT color, apodo FROM perfil WHERE idPerfil = ?", idUsuario,
        (err, resultPefil) => {

            if (err) {
                console.log(err);

            } else {

                res.send(resultPefil);
            }
        });

});



//Cambiamos la sesion activa del usuario
app.post('/changeActiveSesion', (req, res) => {

    const idUsuario = req.body.idUsuario;
    let datosSesion = req.body.datosSesion;

    if (datosSesion === undefined) {
        datosSesion = 'Sesión completada, ningún dato adicional.';
    }


    //Obtenemos la sesion actual
    db.query("SELECT sesion_idSesion FROM sesion_activa WHERE paciente_idPaciente = ?", idUsuario,
        (err, resultIdSesionActiva) => {

            if (err) {
                console.log(err);
            } else {
                if (resultIdSesionActiva.length > 0) {

                    //Guardamos los datos de la sesion actual
                    db.query("INSERT INTO sesion_completa (sesion_completa_idPaciente, sesion_completa_idSesion, datos_sesion) VALUES(?, ?, ?)",
                        [idUsuario, resultIdSesionActiva[0].sesion_idSesion, datosSesion],
                        (err) => {

                            if (err) {
                                console.log(err);
                            } else {
                                //Si se ha guardado de forma correcta cambiamos los 
                                db.query("SELECT idSesion FROM sesion WHERE orden_sesion =" +
                                    "(SELECT orden_sesion + 1 FROM sesion WHERE idSesion IN " +
                                    "(SELECT sesion_idSesion FROM sesion_activa WHERE paciente_idPaciente = ?))", idUsuario,
                                    (err, resultIdSesion) => {
                                        if (err) {
                                            console.log(err);

                                        } else {
                                            if (resultIdSesion.length === 0) {
                                                db.query("DELETE FROM sesion_activa WHERE paciente_idPaciente = ?",
                                                    [idUsuario],
                                                    (error) => {
                                                        if (error) {
                                                            console.log(error);
                                                        } else {
                                                            res.send('Sesión eliminada');
                                                        }
                                                    });

                                            } else {
                                                db.query("UPDATE sesion_activa SET sesion_idSesion = ? WHERE paciente_idPaciente = ?",
                                                    [resultIdSesion[0].idSesion, idUsuario],
                                                    (error) => {
                                                        if (error) {
                                                            console.log(error);
                                                        } else {
                                                            res.send('Sesión cambiada');
                                                        }
                                                    });
                                            }
                                        }
                                    });
                            }
                        });
                }
            }
        }
    );
});


app.post('/getDataPsico', (req, res) => {

    const idUsuario = req.body.idUsuario;

    db.query("SELECT idPsicologo FROM paciente WHERE idPaciente = ?", idUsuario,
        (err, resultIdPsico) => {
            if (err) {
                console.log(err);
            } else {

                db.query("SELECT nombre, apellidos, email FROM usuario WHERE idUsuario = ?", resultIdPsico[0].idPsicologo,
                    (error, resultDatosPsico) => {
                        if (error) {
                            console.log(error);
                        } else {
                            let datosPsicologo = {
                                idPsicologo: resultIdPsico[0].idPsicologo,
                                Nombre: resultDatosPsico[0].nombre,
                                Apellidos: resultDatosPsico[0].apellidos,
                                Email: resultDatosPsico[0].email
                            }
                            res.send(datosPsicologo);
                        }
                    }

                )

            }
        }
    );
});


app.post('/getDataSesionesPaciente', (req, res) => {

    const idUsuario = req.body.idPaciente;

    db.query(
        "SELECT sc.sesion_completa_idSesion, sc.datos_sesion, p.pregunta, r.respuesta " +
        "FROM sesion_completa sc " +
        "LEFT JOIN sesion s ON sc.sesion_completa_idSesion = s.iDsesion " +
        "LEFT JOIN sesion_con_cuestionario scc ON s.iDsesion = scc.sesion_idSesion " +
        "LEFT JOIN cuestionario c ON scc.cuestionario_idCuestionario = c.idCuestionario " +
        "LEFT JOIN pregunta p ON c.idCuestionario = p.idCuestionario " +
        "LEFT JOIN respuesta r ON p.idPregunta = r.idPregunta AND r.idPaciente = ? " +
        "WHERE sc.sesion_completa_idPaciente = ? " +
        "GROUP BY sc.sesion_completa_idSesion, sc.datos_sesion, p.pregunta, r.respuesta " +
        "ORDER BY sc.sesion_completa_idSesion",
        [idUsuario, idUsuario],
        (err, resultSesionesPaciente) => {



            if (err) {
                console.log(err);
            } else {
                const sesiones = resultSesionesPaciente.reduce((acc, row) => {
                    const existingSession = acc.find(
                        (session) => session.sesion_completa_idSesion === row.sesion_completa_idSesion
                    );
                    if (existingSession) {
                        if (row.pregunta && row.respuesta) {
                            existingSession.cuestionario.push({
                                pregunta: row.pregunta,
                                respuesta: row.respuesta,
                            });
                        }
                    } else {
                        const newSession = {
                            sesion_completa_idSesion: row.sesion_completa_idSesion,
                            datos_sesion: row.datos_sesion,
                        };
                        if (row.pregunta && row.respuesta) {
                            newSession.cuestionario = [
                                { pregunta: row.pregunta, respuesta: row.respuesta },
                            ];
                        }
                        acc.push(newSession);
                    }
                    return acc;
                }, []);

                res.send(sesiones);


            }
        }
    );
});


//Para eleimininar la cookie
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('activerUsr');
            res.send('Sesión eliminada');
        }
    });
});



//Para borrar
app.listen(3001, () => {
    console.log('Servidor en el puerto 3001');

});

