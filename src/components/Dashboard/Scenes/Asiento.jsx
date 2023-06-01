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

function DashAsientos() {

    const [asientos, setAsientos] = useState([]);
    const [lugares, setLugares] = useState([]);

    const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    const [fila, setFila] = useState('');
    const [nasiento, setNAsiento] = useState();

    const [eventoID, setEventoID] = useState();


    const asientosCollection = collection(db, "asiento");

    async function getAsientos() {
        const asientosData = [];

        const asientosQuerySnapshot = await getDocs(asientosCollection);

        for (const asientoDoc of asientosQuerySnapshot.docs) {
            const asientoRef = asientoDoc.data();

            asientosData.push({
                id: asientoDoc.id,
                fila: asientoRef.fila,
                numero_asiento: asientoRef.numero_asiento
            })

        }

        setAsientos(asientosData);
    }


    const [showRegistro, setShowRegistro] = useState(false);
    const [showEditar, setShowEditar] = useState(false);
    const asientoRef = useRef();

    useEffect(() => {
        if (!asientoRef.current) {
            asientoRef.current = getAsientos();

        }
    }, []);



    const registrarAsiento = async () => {
        if (!fila || !nasiento ) {
          alert('Todos los campos son obligatorios');
          return;
        }
        try {

          const nuevoAsiento = {
            fila: fila,
            numero_asiento: nasiento
          };
      
          await addDoc(asientosCollection, nuevoAsiento);
      
          alert('Asiento agregado correctamente');
          setShowRegistro(false);  
          getAsientos();

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
                        name="CRUD Asientos"
                    />

                    {/*CRUD*/}
                    <section className=" grid md:grid-cols-1 lg:grid-cols-3 mt-10 gap-8 overflow-auto " >

                        <div className="home_banner bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between">
                            <h4 className="text-white text-2xl font-bold">Registrar Asiento</h4>
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
                                        <h2 className="text-xl font-bold mb-4">Registrar evento</h2>
                                        <form className="mb-2" onSubmit={(e) => e.preventDefault()}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Fila
                                                    </label>
                                                    <select
                                                        name="fila"
                                                        id="fila"
                                                        onChange={(e) => setFila(e.target.value)}
                                                        defaultValue=""
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    >
                                                        <option value="" disabled>
                                                            Seleccione una fila
                                                        </option>
                                                        {filas.map((fila) => (
                                                            <option key={fila} value={fila}>
                                                                {fila}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="papartir" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Número de asiento
                                                    </label>
                                                    <input
                                                        onChange={(e) => setNAsiento(e.target.value)}
                                                        type="number"
                                                        id="papartir"
                                                        name="papartir"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    />
                                                </div>

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
                        </div>

                        {showEditar && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-10 w-1/2 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Registrar evento</h2>
                                <form className="mb-2" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                                Fila
                                            </label>
                                            <select
                                                name="fila"
                                                id="fila"
                                                onChange={(e) => setFila(e.target.value)}
                                                defaultValue=""
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                            >
                                                <option value="" disabled>
                                                    Seleccione una fila
                                                </option>
                                                {filas.map((fila) => (
                                                    <option key={fila} value={fila}>
                                                        {fila}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="papartir" className="block text-sm font-medium text-gray-700 mb-2">
                                                Número de asiento
                                            </label>
                                            <input
                                                onChange={(e) => setNAsiento(e.target.value)}
                                                type="number"
                                                id="papartir"
                                                name="papartir"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                            />
                                        </div>

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

                        {/* <div className="home_banner bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between ">
                        <h4 className="text-white text-2xl font-bold">Editar Evento</h4>
                            <button onClick={() => setShowModal(true)} type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"><RiEdit2Fill  className="text-3xl"/></button>
                              
                        

                        </div>
                     <div className="home_banner  text-center  bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between ">
                     <h2 className=" text-xl text-white font-bold mb-4">Eliminar evento</h2>

                        <form onSubmit={handleSubmit} className=" flex justify-between items">
                            <input type="text" id="lugar" name="lugar"  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                            <button type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">< FaTrash  className="text-3xl"/></button>
                            
                        </form>
                        </div> */}

                    </section>


                    <section className=" grid md:grid-cols-1 lg:grid-cols-1 mt-9 gap-8 overflow-auto ">
                        <div className=" bg-white shadow-md rounded-xl overflow-x-auto overflow-y-auto">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Fila</th>
                                        <th className="py-3 px-6 text-left">Numero de asiento</th>
                                        <th className="py-3 px-6 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {asientos.map((asiento) => (
                                        <tr key={asiento.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{asiento.fila}</td>
                                            <td className="py-3 px-6 text-left">{asiento.numero_asiento}</td>
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

export default DashAsientos;