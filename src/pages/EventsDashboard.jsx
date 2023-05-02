import React,{useState,useEffect} from "react";
import SlidebarE from "./components/SlidebarE";
import Header from "./components/Headerdash";
import { RiAddFill  , RiEdit2Fill,RiDeleteBack2Fill} from "react-icons/ri";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';


function EventsDashboard() { 

    const [eventos, setEventos] = useState([]);

    const [error, setError] = useState("");

    /* useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => setEventos(response.data))
            .catch((error) => setError("Error al cargar los eventos"));
    }, []); */
    
    /* const handleSubmit = (event) => {
        //Agregar el evento a la lista de eventos
        event.preventDefault();
    } */
    const handleDelete = (evento) => {
        setEventos(eventos.filter((e) => e.id !== evento.id));
      };
    
      const handleUpdate = (evento) => {
        console.log(`Editar evento: ${evento.title}`);
      };
    
      const [showModal, setShowModal] = useState(false);

      const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar datos del evento al servidor
        setShowModal(false); // Cerrar el modal después de enviar los datos
      };
    
    return (
       <>
        <div className="home_section grid xl:grid-cols-5 lg:grid-cols-3 min-h-screen ">

            <SlidebarE/>
            <main className="lg:col-span-3 xl:col-span-4 p-9">
                <Header/>
                {/*CRUD*/}
                <section className=" grid md:grid-cols-1 lg:grid-cols-3 mt-10 gap-8 overflow-auto " >
                    
                 <div className="home_banner bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between ">
                    <h4 className="text-white text-2xl  font-bold">Registrar Evento</h4>
                    <button onClick={() => setShowModal(true)} type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"><RiAddFill  className="text-3xl"/></button>
                    {showModal && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white  p-10 w-1/2 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Registrar evento</h2>
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

                                    <button onClick={() => setShowModal(false)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded ">
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
                        
                    </div> 

                    <div className="home_banner bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between ">
                        <h4 className="text-white text-2xl font-bold">Editar Evento</h4>
                            <button onClick={() => setShowModal(true)} type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"><RiEdit2Fill  className="text-3xl"/></button>
                            {showModal && (
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

                                    <button onClick={() => setShowModal(false)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded ">
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
                        

                        </div>
                     <div className="home_banner  text-center  bg-slate-500 p-8 rounded-xl gap-2 flex items-center justify-between ">
                     <h2 className=" text-xl text-white font-bold mb-4">Eliminar evento</h2>

                        <form onSubmit={handleSubmit} className=" flex justify-between items">
                            <input type="text" id="lugar" name="lugar" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                            <button type="submit" className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">< FaTrash  className="text-3xl"/></button>
                            
                        </form>
                        </div>
                    
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
                                <td className="py-3 px-6 text-left">{evento.fecha}</td>
                                <td className="py-3 px-6 text-left">{evento.artista}</td>
                                <td className="py-3 px-6 text-left">{evento.organizador}</td>
                                <td className="py-3 px-6 text-left">{evento.descripcion}</td>
                                <td className="py-3 px-6 text-left">{evento.restricciones}</td>
                                <td className="py-3 px-6 text-left">{evento.lugar}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                    <button
                                        onClick={() => handleUpdate(evento)}
                                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                    >
                                        <RiEdit2Fill />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(evento)}
                                        className="w-4 transform hover:text-purple-500 hover:scale-110"
                                    >
                                        <RiDeleteBack2Fill />
                                    </button>
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

}
export default EventsDashboard;



/* <div className=" bg-white shadow-md rounded-xl overflow-x-auto overflow-y-auto">
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
                                <td className="py-3 px-6 text-left">{evento.fecha}</td>
                                <td className="py-3 px-6 text-left">{evento.artista}</td>
                                <td className="py-3 px-6 text-left">{evento.organizador}</td>
                                <td className="py-3 px-6 text-left">{evento.descripcion}</td>
                                <td className="py-3 px-6 text-left">{evento.restricciones}</td>
                                <td className="py-3 px-6 text-left">{evento.lugar}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                    <button
                                        onClick={() => handleUpdate(evento)}
                                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                    >
                                        <RiEdit2Fill />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(evento)}
                                        className="w-4 transform hover:text-purple-500 hover:scale-110"
                                    >
                                        <RiDeleteBack2Fill />
                                    </button>
                                    </div>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
 */


