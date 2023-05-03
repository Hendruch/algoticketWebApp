import React from 'react';
import '../Perfil/Perfil.css';

const perfil = () => {
  return (
    

  
    <section className="seccion-perfil-usuario">
  
      <div className="perfil-usuario-header">
        <div className="perfil-usuario-portada bg-gradient-to-br from-purple-500 to-blue-500">
          <div className="perfil-usuario-avatar border-4 border-white bg-gray-300 rounded-full shadow-lg">
            <img src="Img/imagenperfil.jpg" alt="img-avatar" className="w-full h-full rounded-full" />
            <button type="button" className="boton-avatar absolute top-0 left-0 border-0 bg-white shadow-lg w-11 h-11 rounded-full">
              <i className="far fa-image"></i>
            </button>
          </div>

       

          <button type="button" className="boton-portada absolute top-1 right-1 border-0 border-radius-8 px-3 py-2 bg-black bg-opacity-50 text-white cursor-pointer">
            <i className="far fa-image"></i> Cambiar fondo
          </button>
        </div>
      </div>
      <div className="perfil-usuario-body box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;">
        <div className="perfil-usuario-bio bg-white p-6 shadow-lg rounded">
          <h3 className="titulo text-2xl mb-2">Armando Ayala Luján</h3>
          <p className="texto"></p>
        </div>
        <div className="perfil-usuario-footer bg-white p-6 shadow-lg rounded flex">
          <ul className="lista-datos w-1/2">
            <li>
              <i className="icono fas fa-map-signs"></i> Correo: Ejemplo@gmail.com
            </li>
            <li>
              <i className="icono fas fa-phone-alt"></i> Telefono: 951432123
            </li>
          </ul>
          <ul className="lista-datos w-1/2">
            <li>
              <i className="icono fas fa-map-marker-alt"></i> Ubicacion: Oaxaca de Juaréz
            </li>
            <li>
              <i className="icono fas fa-calendar-alt"></i> Fecha nacimiento: 24/04/2000
            </li>
          </ul>
        </div>
        <ul className="my-4"></ul>
        <div className="perfil-usuario-bio bg-white p-6 shadow-lg rounded">
          <h3 className="titulo text-2xl mb-2">Eventos Comprados</h3>
          <p className="texto"></p>
        </div>
        <div className="redes-sociales absolute right-0 top-0 flex flex-col">
          <a href="" className="boton-redes facebook bg-blue-500">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="boton-redes twitter bg-green-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="boton-redes instagram bg-gradient-to-br from-pink-500 to-blue-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="boton-redes">
            <i className="fas fa-gear"></i>
          </a>
        </div>
      </div>
      
    </section>
    
  );
};

export default perfil;
