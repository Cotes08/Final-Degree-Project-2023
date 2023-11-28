import React from 'react';
import './app.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProfileProvider } from './ProfileContext';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';
import UiPsicologo from './components/usrPsicologo/UiPsicologo';
import DatosPaciente from './components/usrPsicologo/DatosPaciente';
import Scene from './components/three/Scene';
import SelectSesion from './components/three/Sesiones/SelectSesion';
import DeprFormBDI from './components/three/Sesiones/Depresion/Sesion0/DeprFormBDI-2';
import DeprFormEros from './components/three/Sesiones/Depresion/Sesion0/DeprFormEros';
import ActividadGratificante from './components/three/Sesiones/Depresion/Sesion2/ActividadGartificante';
import DeprFormPensamientoAuto from './components/three/Sesiones/Depresion/Sesion5/DeprFormPensamientoAuto';
import PilotoAutomatico from './components/three/Sesiones/Depresion/Sesion7/PilotoAutomatico';
import EstoyPresente from './components/three/Sesiones/Depresion/Sesion9/EstoyPresente';



function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginForm />,
    },
    {
      path: '/register',
      element: <RegisterForm />,
    },
    {
      path: '/logeadoUser',
      element: <Scene />,
    },
    {
      path: '/logeadoPsico',
      element: <UiPsicologo />,
    },
    {
      path: '/paciente/:idUsuario',
      element: <DatosPaciente />,
    },
    {
      path: '/selectSesion',
      element: <SelectSesion />,
    },
    {
      path: '/deprFormEros',
      element: <DeprFormEros />,
    },
    {
      path: '/deprFormBDI',
      element: <DeprFormBDI />,
    },
    {
      path: '/actividadGratificante',
      element: <ActividadGratificante />,
    },
    {
      path: '/pensamientoAutomatico',
      element: <DeprFormPensamientoAuto />,
    },
    {
      path: '/pilotoAutomatico',
      element: <PilotoAutomatico />,
    },
    {
      path: '/estoyPresente',
      element: <EstoyPresente />,
    }
  ]);


  return (
    <div className="App">
      <div className="page">
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </div>
    </div>
  );
}

export default App;
