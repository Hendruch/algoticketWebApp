import React from "react";
import { useNavigate } from 'react-router';
import Default from '../assets/img/Default.jpeg';

function Concert_cart({card}) {
  var numero = 0;

  const navigate = useNavigate();


  const handleNavigation = (event) => {
    const id = event.target.id;
    navigate(`/asientos?param=${id}`);
  };


  return (
    <div
      className="w-full bg-white rounded-2xl flex-row md:flex justify-between overflow-hidden my-10 drop-shadow-xl"
      id="Concert_cart"
      style={{ height: 300 }}
    >
      
      <div className="hidden md:flex md:w-5/12 ">
        <img
          src={card?.image || Default }
          alt=""
          className="w-full h-50 object-cover rounded-2xl my-8 ml-6"
        />
      </div>
      <div className="w-12/12 md:w-7/12  p-10 content-between">
        <div className="text-black font-bold sm:text-lg float-left mr-3">
          <p className="text-2xl">{card?.mes}</p>
          <p className="text-4xl">{card?.day}</p>
        </div>
        <p className="text-4xl font-bold">
          {card?.artista}
        </p>
        <p className="mt-2 font-bold mb-2">
          {card?.lugar.ciudad}, {card?.lugar.entidad_federativa} | {card?.lugar.inmueble}
        </p>
        <p>
          Vive una experiencia única con {card?.artista} en {card?.lugar.ciudad}, {card?.lugar.entidad_federativa} a las {card?.time} 
        </p>
        <p>{card?.descripcion}</p>
        <div className="flex mt-10">
          <button className="mr-auto">
            <a href="/asientos" className="font-semibold py-3 px-6 text-white bg-black rounded-full hover:bg-gray-700 ">Más Info</a>
          </button>
          <button  className="mr-auto" >
            <a id={card?.id} onClick={handleNavigation} className="font-semibold py-3 px-6 text-white bg-black rounded-full hover:bg-gray-700 ">Reservar</a>
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Concert_cart;
