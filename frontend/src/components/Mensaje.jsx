//Esto es el componente mensaje, sirve para que el manejo del chat sea mas sencillo y asi separamos la logica de la funcionalidad
const Mensaje = (props) => {

    const {remitente, texto, esPsicologo, fecha} = props;
    

    const Fecha = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const Hora = { hour: '2-digit', minute: '2-digit' };

    const fechaString = fecha.toLocaleDateString([], Fecha) + ' ' + fecha.toLocaleTimeString([], Hora);

    return (
        <div className={`mensaje ${esPsicologo ? 'mensaje-psicologo' : 'mensaje-paciente'}`}>
            <div /* className='mensaje-texto' */><b>{remitente}</b></div>
            <div /* className='mensaje-texto' */>{texto}</div>
            <div  className='mensaje-fecha' >{fechaString}</div>
        </div>
    );
};

export default Mensaje;