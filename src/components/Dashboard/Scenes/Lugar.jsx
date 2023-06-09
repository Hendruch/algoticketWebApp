import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React, { useState, useEffect, useRef } from "react";
import { RiAddFill, RiEdit2Fill, RiDeleteBack2Fill } from "react-icons/ri";
import { FaTrash } from 'react-icons/fa';
import { db } from "/src/config/firebase-config.jsx";
import { initializeApp } from "firebase/app";

import {
    collection,
    doc,
    where,
    orderBy,
    getDocs,
    getDoc,
    query,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

function DashLugar() {

    const [entidad, setEntidad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [inmueble, setInmueble] = useState('');
    const [lugares, setLugares] = useState([]);

    const estados_mexico = [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Coahuila",
        "Colima",
        "Chiapas",
        "Chihuahua",
        "Ciudad de México",
        "Durango",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "México",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas"
    ];


    const lugarCollection = collection(db, "lugar");

    async function getLugares() {
        const lugaresData = [];

        const lugarQuerySnapshot = await getDocs(lugarCollection);

        for (const lugarDoc of lugarQuerySnapshot.docs) {
            const lugarRef = lugarDoc.data();

            lugaresData.push({
                id: lugarDoc.id,
                entidad_federativa: lugarRef.entidad_federativa,
                ciudad: lugarRef.ciudad,
                inmueble: lugarRef.inmueble
            })

        }

        setLugares(lugaresData);
    }


    const [showRegistro, setShowRegistro] = useState(false);
    const [showEditar, setShowEditar] = useState(false);
    const lugarRef = useRef();

    useEffect(() => {
        if (!lugarRef.current) {
            lugarRef.current = getLugares();
        }
    }, []);



    const registrarLugar = async () => {
        if (!entidad || !ciudad || !inmueble ) {
          alert('Todos los campos son obligatorios');
          return;
        }
        try {

          const nuevoLugar = {
            entidad_federativa: entidad,
            ciudad: ciudad,
            inmueble: inmueble
          };
      
          await addDoc(lugarCollection, nuevoLugar);
      
          alert('Lugar agregado correctamente');
          setShowRegistro(false);  
          getLugares();

        } catch (error) {
          console.error(error);
         
        }
    };

      

    return (
        <>
            <div className="home_section grid xl:grid-cols-5 lg:grid-cols-3 min-h-screen ">

                <Sidebar />
                <main className="lg:col-span-3 xl:col-span-4 p-9">
                    <Topbar
                        name="CRUD Lugar"
                    />

                    {/*CRUD*/}
                    <section className=" grid md:grid-cols-1 lg:grid-cols-3 mt-10 gap-8 overflow-auto " >

                        <div className="home_banner bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between">
                            <h4 className="text-white text-2xl font-bold">Registrar Lugar</h4>
                            <button
                                onClick={() => {
                                    setShowRegistro(true);
                                }}
                                className="bg-red-500 hover:bg-black-300 text-white font-bold py-2 px-4 rounded"
                            >
                                <RiAddFill className="text-3xl" />
                            </button>
                            {showRegistro && (
                                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-white p-10 w-1/2 rounded-lg">
                                        <h2 className="text-xl font-bold mb-4">Registrar lugar</h2>
                                        <form className="mb-2" onSubmit={(e) => e.preventDefault()}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Entidad Federativa
                                                    </label>
                                                    <select
                                                        name="entidadF"
                                                        id="entidadF"
                                                        onChange={(e) => setEntidad(e.target.value)}
                                                        defaultValue=""
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    >
                                                        <option value="" disabled>
                                                            Seleccione una entidad federativa
                                                        </option>
                                                        {estados_mexico.map((estados) => (
                                                            <option key={estados} value={estados}>
                                                                {estados}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="papartir" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Ciudad
                                                    </label>
                                                    <input
                                                        onChange={(e) => setCiudad(e.target.value)}
                                                        type="text"
                                                        id="ciudad"
                                                        name="ciudad"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                    <label htmlFor="papartir" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Inmueble
                                                    </label>
                                                    <input
                                                        onChange={(e) => setInmueble(e.target.value)}
                                                        type="text"
                                                        id="inmueble"
                                                        name="inmueble"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    />
                                                </div>
                                            <br />
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                                                <button
                                                    onClick={() => setShowRegistro(false)}
                                                    className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    onClick={registrarLugar}
                                                    className="bg-green-500 hover:bg-red-300 text-white font-bold py-2 px-14 rounded"
                                                >
                                                    Enviar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>

                        {showEditar && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-10 w-1/2 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Registrar lugar</h2>
                                <form className="mb-2" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                                Entidad Federativa
                                            </label>
                                            <select
                                                name="entidadF"
                                                id="entidadF"
                                                onChange={(e) => setEntidad(e.target.value)}
                                                defaultValue=""
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Seleccione una entidad federativa
                                                </option>
                                                {estados_mexico.map((estados) => (
                                                    <option key={estados} value={estados}>
                                                        {estados}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="papartir" className="block text-sm font-medium text-gray-700 mb-2">
                                                Ciudad
                                            </label>
                                            <input
                                                onChange={(e) => setCiudad(e.target.value)}
                                                type="text"
                                                id="ciudad"
                                                name="ciudad"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                            <label htmlFor="papartir" className="block text-sm font-medium text-gray-700 mb-2">
                                                Inmueble
                                            </label>
                                            <input
                                                onChange={(e) => setEntidad(e.target.value)}
                                                type="text"
                                                id="inmueble"
                                                name="inmueble"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                            />
                                        </div>
                                    <br />
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                                        <button
                                            onClick={() => setShowRegistro(false)}
                                            className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={registrarAsiento}
                                            className="bg-green-500 hover:bg-red-300 text-white font-bold py-2 px-14 rounded"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        )}

                    </section>


                    <section className=" grid md:grid-cols-1 lg:grid-cols-1 mt-9 gap-8 overflow-auto ">
                        <div className=" bg-white shadow-md rounded-xl overflow-x-auto overflow-y-auto">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Entidad Federativa</th>
                                        <th className="py-3 px-6 text-left">Ciudad</th>
                                        <th className="py-3 px-6 text-left">Inmueble</th>
                                        <th className="py-3 px-6 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {lugares.map((lugar) => (
                                        <tr key={lugar.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{lugar.entidad_federativa}</td>
                                            <td className="py-3 px-6 text-left">{lugar.ciudad}</td>
                                            <td className="py-3 px-6 text-left">{lugar.inmueble}</td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center space-x-2">
                                                    <button onClick={() => {
                                                        setShowEditar(true);
                                                    }} type="submit" className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"><RiEdit2Fill className="text-xl" /></button>

                                                    <button type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">< FaTrash className="text-xl" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </section>
                    {/*  */}
                </main>

            </div>



        </>
    );
};

export default DashLugar;