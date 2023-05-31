import React, {useState} from 'react'
//ICONOS
import { RiDashboardFill, RiCalendarEventLine,RiPieChartLine,RiMore2Fill,RiCloseFill, RiUser3Line } from "react-icons/ri";
import { MdOutlinePlace, MdOutlineEventSeat } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false)

  return (
    <>
        <div className='bg-[#dddddd] h-full fixed lg:static lg:w-full w-[80%] md:w-[40%] z-50 transition-all duration-300 '>
            <div className='flex flex-col items-center justify-center p-8 gap-2 '>
                <img src="https://cdn-3.expansion.mx/dims4/default/a3b7e2d/2147483647/strip/true/crop/790x444+0+0/resize/1800x1012!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F17%2Fba%2Ff16c49a9476d9c37cf96a019a9cb%2Ffmz1-fwxmam5fn2.jpg" alt="Perfil"
                className="w-20 h-20 object-cover rounded-full ring-2 ring-white"/>
                <h1 className='text-2xl font-bold text-white'>Josias Dominguez</h1>
                <p className='bg-red-700 py-1 px-3 rounded-full text-white'>Administrador</p>
            </div>
            {/* PESTAÑAS */}
            <div className='bg-black p-8 rounded-tr-[100px] h-[67vh] flex flex-col
            justify-between gap-8'>
                <nav className='flex flex-col gap-6'>
                    <NavLink to={'/'} className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <RiUser3Line/>Usuarios
                    </NavLink>
                    <NavLink to={'/DashEventos'} className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <RiCalendarEventLine/>Eventos
                    </NavLink>
                    <NavLink to={'/'} className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <MdOutlinePlace/>Lugares
                    </NavLink>
                    <NavLink to={'/DashAsientos'} className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <MdOutlineEventSeat/>Asientos
                    </NavLink>
                    <a href='#' className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <RiDashboardFill/>Secciones
                    </a>
                    <a href='#' className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <IoTicket/>Boletos
                    </a>
                    
                </nav>
                <button className='hover:bg-red-800/80 bg-slate-800/40 text-white p-4 rounded-xl text-center'>
                <a href='#'>Log Out</a>
                </button>
            </div>
            
        </div>
        {/* BUTTON MOBILE */}
        <button onClick={() => setShowMenu(!showMenu)} 
        className='lg:hidden fixed right-4 bottom-4 text-2xl bg-slate-900 p-2.5 rounded-full text-white z-50'> 
            {showMenu ? <RiCloseFill/> : <RiMore2Fill/>}
        </button>
    </>
  )
}

export default Sidebar