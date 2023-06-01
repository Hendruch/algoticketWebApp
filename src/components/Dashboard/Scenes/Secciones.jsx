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

function DashSeccion() {

    const [enventoID, setEventoID] = useState();
    const [precio, setPrecio] = useState();
    const [seccion, setSeccion] = useState('');
    const [seccionNum, setSeccionNum] = useState();
    const [tipoBoleto, setTipoBoleto] = useState();
    const [rangoAsientos, setRangoAsientos] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [asientos, setAsientos] = useState([]);

    var rAsientos = [];

    const seccionCollection = collection(db, "seccion");
    const eventosCollection = collection(db, "evento");
    const asientosCollection = collection(db, "asiento");

    const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    async function getAsientos() {
        const asientosData = [];

        const asientosQuerySnapshot = await getDocs(asientosCollection);

        for (const asientoDoc of asientosQuerySnapshot.docs) {
            const asientoRef = asientoDoc.data();

            asientosData.push({
                id: asientoDoc.id,
                path: asientoDoc.ref,
                fila: asientoRef.fila,
                numero_asiento: asientoRef.numero_asiento
            })
            console.log(asientoDoc.ref)
        }

        setAsientos(asientosData);
    }

    async function getEventos() {
        const eventosData = [];

        const eventosQuerySnapshot = await getDocs(eventosCollection);

        for (const eventoDoc of eventosQuerySnapshot.docs) {
            const eventoRef = eventoDoc.data();

            const lugar = await getDoc(eventoRef.lugarId)

            eventosData.push({
                id: eventoDoc.id,
                path: eventoDoc.ref,
                artista: eventoRef.artista,
                descripcion: eventoRef.descripcion,
                fecha: eventoRef.fecha,
                IDlugar: lugar.data().inmueble,
                nombre: eventoRef.nombre_evento,
                organizador: eventoRef.organizador,
                restricciones: eventoRef.restricciones
            })
            //console.log(eventoDoc.ref)
        }

        setEventos(eventosData);
        getSecciones();
        getAsientos();
    }

    async function getSecciones() {
        const seccionesData = [];

        const seccionQuerySnapshot = await getDocs(seccionCollection);

        for (const seccionDoc of seccionQuerySnapshot.docs) {
            const seccionRef = seccionDoc.data();

            const evento = await getDoc(seccionRef.eventoId)

            seccionesData.push({
                id: seccionDoc.id,
                eventoID: evento.data().nombre_evento,
                precio: seccionRef.precio,
                seccion: seccionRef.seccion,
                seccion_num: seccionRef.seccion_num,
                tipo_boleto: seccionRef.tipo_boleto,
                rango_asientos: seccionRef.rango_asientos
            })

        }

        setSecciones(seccionesData);
    }


    const [showRegistro, setShowRegistro] = useState(false);
    const [showEditar, setShowEditar] = useState(false);
    const Ref = useRef();

    useEffect(() => {
        if (!Ref.current) {
            Ref.current = getEventos();
        }
    }, []);



    const registrarSeccion = async () => {
        if (!enventoID || !precio || !seccion || !seccionNum || !tipoBoleto || !rangoAsientos ) {
          alert('Todos los campos son obligatorios');
          return;
        }
        try {
            setRangoAsientos(rAsientos)
            console.log(rAsientos)

          const nuevaSeccion = {
            eventoID: enventoID,
            precio: precio,
            seccion: seccion,
            seccion_num: seccionNum,
            tipo_boleto: tipoBoleto,
            rango_asientos: rAsientos
          };
      
          await addDoc(seccionCollection, nuevaSeccion);
      
          alert('Seccion agregada correctamente');
          setShowRegistro(false);  
          getSecciones();
          rAsientos = [];

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
                        name="CRUD Seccion"
                    />

                    {/*CRUD*/}
                    <section className=" grid md:grid-cols-1 lg:grid-cols-3 mt-10 gap-8 overflow-auto " >

                        <div className="home_banner bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between">
                            <h4 className="text-white text-2xl font-bold">Registrar Seccion</h4>
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
                                        <h2 className="text-xl font-bold mb-4">Registrar Seccion</h2>
                                        <form className="mb-2" onSubmit={(e) => e.preventDefault()}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="evento" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Evento
                                                    </label>
                                                    <select
                                                        name="evento"
                                                        id="evento"
                                                        onChange={(e) => setEventoID(e.target.value)}
                                                        defaultValue=""
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    >
                                                        <option value="" disabled>
                                                            Seleccione un evento
                                                        </option>
                                                        {eventos.map((evento) => (
                                                            <option key={evento.id} value={evento.path}>
                                                                {evento.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="Precio" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Precio
                                                    </label>
                                                    <input
                                                        onChange={(e) => setPrecio(e.target.value)}
                                                        type="number"
                                                        id="Precio"
                                                        name="Precio"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="papartir" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Seccion
                                                    </label>
                                                    <select
                                                        name="fila"
                                                        id="fila"
                                                        onChange={(e) => setSeccion(e.target.value)}
                                                        defaultValue=""
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    >
                                                        <option value="" disabled>
                                                            Seleccione una seccion
                                                        </option>
                                                        {filas.map((fila) => (
                                                            <option key={fila} value={fila}>
                                                                {fila}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="Precio" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Numero de seccion
                                                    </label>
                                                    <input
                                                        onChange={(e) => setSeccionNum(e.target.value)}
                                                        type="number"
                                                        id="Precio"
                                                        name="Precio"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="Precio" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Tipo de boleto
                                                    </label>
                                                    <input
                                                        onChange={(e) => setTipoBoleto(e.target.value)}
                                                        type="text"
                                                        id="Precio"
                                                        name="Precio"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="Precio" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Rango de asientos
                                                </label>
                                                {asientos.map((asiento) => (
                                                    <>
                                                        <input type="checkbox" name={asiento.id} id={asiento.id} onChange={(e) => {
                                                            if(e.target.checked){
                                                                rAsientos.push(asiento.path)
                                                            }else{
                                                                rAsientos.pop(asiento.path)
                                                            }
                                                        }}/>
                                                        <label htmlFor={asiento.id} className="mr-2">{`${asiento.fila}${asiento.numero_asiento}`}</label>
                                                    </>
                                                ))}
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
                                                    onClick={registrarSeccion}
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
                                        <th className="py-3 px-6 text-left">Evento</th>
                                        <th className="py-3 px-6 text-left">Precio</th>
                                        <th className="py-3 px-6 text-left">Seccion</th>
                                        <th className="py-3 px-6 text-center">Seccion numero</th>
                                        <th className="py-3 px-6 text-center">Tipo Boleto</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {secciones.map((seccion) => (
                                        <tr key={seccion.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{seccion.eventoID}</td>
                                            <td className="py-3 px-6 text-left">{seccion.precio}</td>
                                            <td className="py-3 px-6 text-left">{seccion.seccion}</td>
                                            <td className="py-3 px-6 text-left">{seccion.seccion_num}</td>
                                            <td className="py-3 px-6 text-left">{seccion.tipo_boleto}</td>
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

export default DashSeccion;