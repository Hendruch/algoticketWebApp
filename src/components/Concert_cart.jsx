import React from "react";

function Concert_cart() {
  return (
    <div
      className="w-full bg-white rounded-2xl flex-row md:flex justify-between overflow-hidden my-10 drop-shadow-xl"
      id="Concert_cart"
      style={{ height: 300 }}
    >
      
      <div className="hidden md:flex md:w-5/12 ">
        <img
          src="https://picsum.photos/200/300"
          alt=""
          className="w-full h-50 object-cover rounded-2xl my-8 ml-6"
        />
      </div>
      <div className="w-12/12 md:w-7/12 grid grid-cols-1 p-10 content-between">
        <h5 className="text-black font-medium sm:text-sm">
          Sep 2 Luis Miguel
        </h5>
        <h1
          className="text-black font-semibold mt-8 sm:text-sm"
          id="Concert_card_tittle"
        >
          Oaxaca de Juárez, Oaxaca | Auditorio Guelaguetza
        </h1>
        <p className="text-black mt-5">
          Info Relevante Info Relevante Info Relevante Info Relevante Info Relevante Info Relevante 
        </p>
        <div className="flex">
          <button className="mt-8 mr-auto">
            <a href="#" className="font-semibold py-3 px-6 text-white bg-black rounded-full hover:bg-sky-800 hover:text-black">Más Info</a>
          </button>
          <button className="mt-8 mr-auto">
            <a href="#" className="font-semibold py-3 px-6 text-white bg-black rounded-full hover:bg-sky-800 hover:text-black">Reservar</a>
          </button>
          <button className="mt-8 mr-auto">
            <a href="#" className="font-semibold py-3 px-6 text-white bg-black rounded-full hover:bg-sky-800 hover:text-black">♡</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Concert_cart;
