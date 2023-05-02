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
          src="https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/J7KKJYMYSFBFHPJQ2BDOINX4O4.jpg"
          alt=""
          className="w-full h-50 object-cover rounded-2xl my-8 ml-6"
        />
      </div>
      <div className="w-12/12 md:w-7/12  p-10 content-between">
        <div className="text-black font-bold sm:text-lg float-left mr-3">
          <p className="text-2xl">Sep</p>
          <p className="text-4xl">02</p>
        </div>
        <p className="text-4xl font-bold">
          Luis Miguel
        </p>
        <p className="mt-2 font-bold mb-2">
          Oaxaca de Juarez, Oaxaca | Auditorio Guelaguetza
        </p>
        <p>
          Vive una experiencia única con Luis Miguel en Oaxaca de Juarez, Oaxaca a las 20:00 hrs. 
        </p>
        <p> No te pierdas este concierto de la gira México por siempre.</p>
        <div className="flex mt-10">
          <button className="mr-auto">
            <a href="#" className="font-semibold py-3 px-6 text-white bg-black rounded-full hover:bg-gray-700 ">Más Info</a>
          </button>
          <button className="mr-auto">
            <a href="#" className="font-semibold py-3 px-6 text-white bg-black rounded-full hover:bg-gray-700 ">Reservar</a>
          </button>
          <button className="mr-auto">
            <a href="#" className="font-semibold py-3 px-6 text-white bg-black rounded-full hover:bg-gray-700 ">♡</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Concert_cart;
