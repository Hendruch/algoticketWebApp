import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React,{useState,useEffect, useRef} from "react";
import { RiAddFill  , RiEdit2Fill,RiDeleteBack2Fill} from "react-icons/ri";
import { FaTrash } from 'react-icons/fa';
import { db } from "/src/config/firebase-config.jsx";
import {
  collection,
  doc,
  where,
  orderBy,
  getDocs,
  getDoc,
  query,
  addDoc
} from "firebase/firestore";

function DashEventos () {

    const [eventos, setEventos] = useState([]);
    const [lugares, setLugares] = useState([]);

    const [nombreE, setNombreE] = useState('');
    const [nArtista, setNartista] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState();
    const [lugarid, setlugar] = useState();
    const [organizador, setOrganizador] = useState('');
    const [restricciones, setRestricciones] = useState('');

    const [error, setError] = useState("");

    const eventosCollection = collection(db, "evento");
    const lugarCollection = collection(db, "lugar");

    async function getEventos() {
        const eventosData = [];

        const eventosQuerySnapshot = await getDocs(eventosCollection);

        for(const eventoDoc of eventosQuerySnapshot.docs){
            const eventoRef = eventoDoc.data();

            const lugar = await getDoc(eventoRef.lugarId)

            eventosData.push({
                id: eventoDoc.id,
                artista: eventoRef.artista,
                descripcion: eventoRef.descripcion,
                fecha: eventoRef.fecha,
                IDlugar: lugar.data().inmueble,
                nombre: eventoRef.nombre_evento,
                organizador: eventoRef.organizador,
                restricciones: eventoRef.restricciones
            })
        }

        setEventos(eventosData);

        getLugares();
    }

    async function getLugares() {
        const lugaresData = [];

        const lugaresQuerySnapshot = await getDocs(lugarCollection);

        for(const lugarDoc of lugaresQuerySnapshot.docs){
            const lugarRef = lugarDoc.data();

            lugaresData.push({
                refencia: lugarDoc.ref.path,
                ciudad: lugarRef.ciudad,
                entidad_federativa: lugarRef.entidad_federativa,
                inmueble: lugarRef.inmueble
            })
        }
        setLugares(lugaresData);
    }

    
    
    
    const handleDelete = (evento) => {
        setEventos(eventos.filter((e) => e.id !== evento.id));
    };
    
    const handleUpdate = (evento) => {
        console.log(`Editar evento: ${evento.title}`);
    };
    
    //! No envía la información a la BD y no marca ningun error, tampoco muestra la alerta. 
    const handleSubmit = async () => {
        try {
            await addDoc(eventosCollection, {
                artista: nArtista,
                descripcion: descripcion,
                fecha: fecha,
                lugarId: '/'+lugarid,
                nombre_evento: nombreE,
                organizador: organizador,
                restricciones: restricciones
            });
            alert('Evento agregado correctamente');
            setShowRegistro(false); // Cerrar el modal después de enviar los datos
        } catch (error) {
            console.error(error);
        }
        // Lógica para enviar datos del evento al servidor
        
    };
        
    const [showRegistro, setShowRegistro] = useState(false);
    const [showEditar, setShowEditar] = useState(false);
    const eventoRef = useRef();

    useEffect(() => {
        if (!eventoRef.current) {
            eventoRef.current = getEventos();
        }
    }, []);

    return(
        <>
        <div className="home_section grid xl:grid-cols-5 lg:grid-cols-3 min-h-screen ">

            <Sidebar/>
            <main className="lg:col-span-3 xl:col-span-4 p-9">
                <Topbar
                    name="CRUD Eventos"
                />

                {/*CRUD*/}
                <section className=" grid md:grid-cols-1 lg:grid-cols-3 mt-10 gap-8 overflow-auto " >
                    
                 <div className="home_banner bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between ">
                    <h4 className="text-white text-2xl  font-bold">Registrar Evento</h4>
                    <button onClick={() => {
                        setShowRegistro(true);
                        console.log(lugares)
                        }} type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"><RiAddFill  className="text-3xl"/></button>
                    {showRegistro && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white  p-10 w-1/2 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Registrar evento</h2>
                                <form className="mb-2"> 
                                <div className="grid grid-cols-2 gap-4 ">
                                        <div>
                                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre del evento</label>
                                            <input onChange={(e) => setNombreE(e.target.value)} type="text" id="nombre" name="nombre" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                                            <input onChange={(e) => setFecha(e.target.value)} type="date" id="fecha" name="fecha" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="artista" className="block text-sm font-medium text-gray-700 mb-2">Artista</label>
                                            <input onChange={(e) => setNartista(e.target.value)} type="text" id="artista" name="artista" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="organizador" className="block text-sm font-medium text-gray-700 mb-2">Organizador</label>
                                            <input onChange={(e) => setOrganizador(e.target.value)} type="text" id="organizador" name="organizador" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                            <textarea onChange={(e) => setDescripcion(e.target.value)} id="descripcion" name="descripcion" rows="3" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="restricciones" className="block text-sm font-medium text-gray-700 mb-2">Restricciones</label>
                                            <textarea onChange={(e) => setRestricciones(e.target.value)} id="restricciones" name="restricciones" rows="3" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
                                        </div>
                                        
                                        </div> 
                                        <div>
                                            <label htmlFor="lugar" className="block text-sm font-medium text-gray-700 mb-2">Lugar</label>
                                            <select name="lugar" id="lugarR" onChange={(e) => setlugar(e.target.value)} defaultValue={(e) => setlugar(e.target.value)}>
                                                {lugares.map((inmueble) => {
                                                    return (
                                                    <option value={inmueble.refencia} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" >{inmueble.inmueble}</option>
                                                    );
                                                })}
                                            </select>
                                            
                                        </div>   
                                        <br />              
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">

                                    <button onClick={() => setShowRegistro(false)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded ">
                                        Cancelar
                                    </button>
                                    <button onClick={handleSubmit} type="submit" className=" bg-green-500 hover:bg-red-300 text-white font-bold py-2 px-14 rounded">
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
                            <div className="bg-white  p-10 w-1/2 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Editar evento</h2>
                                <form className="mb-2"> 
                                <div className="grid grid-cols-2 gap-4 ">
                                        <div>
                                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre del evento</label>
                                            <input type="text" id="nombre" name="nombre" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                                            <input type="date" id="fecha" name="fecha" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="artista" className="block text-sm font-medium text-gray-700 mb-2">Artista</label>
                                            <input type="text" id="artista" name="artista" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="organizador" className="block text-sm font-medium text-gray-700 mb-2">Organizador</label>
                                            <input type="text" id="organizador" name="organizador" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                            <textarea id="descripcion" name="descripcion" rows="3" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="restricciones" className="block text-sm font-medium text-gray-700 mb-2">Restricciones</label>
                                            <textarea id="restricciones" name="restricciones" rows="3" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
                                        </div>
                                        
                                        </div> 
                                        <div>
                                            <label htmlFor="lugar" className="block text-sm font-medium text-gray-700 mb-2">Lugar</label>
                                            <input type="text" id="lugar" name="lugar" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                                        </div>   
                                        <br />              
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">

                                    <button onClick={() => setShowEditar(false)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded ">
                                        Cancelar
                                    </button>
                                    <button type="submit" className=" bg-green-500 hover:bg-red-300 text-white font-bold py-2 px-14 rounded">
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
                            <input type="text" id="lugar" name="lugar" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                            <button type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">< FaTrash  className="text-3xl"/></button>
                            
                        </form>
                        </div> */}
                    
                </section>


                <section className=" grid md:grid-cols-1 lg:grid-cols-1 mt-9 gap-8 overflow-auto "> 
                <div className=" bg-white shadow-md rounded-xl overflow-x-auto overflow-y-auto">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Nombre del evento</th>
                                <th className="py-3 px-6 text-left">Fecha</th>
                                <th className="py-3 px-6 text-left">Artista</th>
                                <th className="py-3 px-6 text-left">Organizador</th>
                                <th className="py-3 px-6 text-left">Descripción</th>
                                <th className="py-3 px-6 text-left">Restricciones</th>
                                <th className="py-3 px-6 text-left">Lugar</th>
                                <th className="py-3 px-6 text-center">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                            {eventos.map((evento) => (
                                <tr key={evento.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{evento.nombre}</td>
                                <td className="py-3 px-6 text-left">{evento.fecha.toDate().toLocaleDateString()}</td>
                                <td className="py-3 px-6 text-left">{evento.artista}</td>
                                <td className="py-3 px-6 text-left">{evento.organizador}</td>
                                <td className="py-3 px-6 text-left">{evento.descripcion}</td>
                                <td className="py-3 px-6 text-left">{evento.restricciones}</td>
                                <td className="py-3 px-6 text-left">{evento.IDlugar.toString()}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center space-x-2">
                                    <button onClick={() => setShowEditar(true)} type="submit" className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"><RiEdit2Fill  className="text-xl"/></button>
                                    
                                    <button type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">< FaTrash  className="text-xl"/></button>
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

export default DashEventos;