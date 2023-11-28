import { Html, useProgress } from '@react-three/drei';
import '../Three.css';

export function Loader() {
    const { progress } = useProgress();

    //Esto se encarga de mostrar la pantalla de carga
    return (
        <Html>
            <div className="loader">
                <h1 className="loader-title">Cargando...</h1>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.round(progress)}%` }} />
                </div>
                <p className="loader-progress">{Math.round(progress)}% cargado</p>
            </div>
        </Html>
    );
}