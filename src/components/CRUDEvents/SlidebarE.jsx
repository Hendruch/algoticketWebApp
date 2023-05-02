import React, {useState} from 'react'
//ICONOS
import { RiHome4Line, RiDashboardFill, RiCalendarEventFill,RiPieChartLine,RiMore2Fill,RiCloseFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const SlidebarE = () => {
    const [showMenu, setShowMenu] = useState(false)
  return (
    <>
        <div className={`bg-slate-950 h-full fixed lg:static lg:w-full w-[80%] md:w-[40%] z-50 transition-all duration-300 ${showMenu ? "left-0" : "-left-full"}`}>
            <div className='flex flex-col items-center justify-center p-8 gap-2 '>
                <img src="https://cdn-3.expansion.mx/dims4/default/a3b7e2d/2147483647/strip/true/crop/790x444+0+0/resize/1800x1012!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F17%2Fba%2Ff16c49a9476d9c37cf96a019a9cb%2Ffmz1-fwxmam5fn2.jpg" alt="Perfil"
                className="w-20 h-20 object-cover rounded-full ring-2 ring-white"/>
                <h1 className='text-2xl font-bold text-white'>Josias Dominguez</h1>
                <p className='bg-red-700 py-1 px-3 rounded-full text-white'>Administrador</p>
            </div>
            {/* PESTAÑAS */}
            <div className='bg-neutral-600/80 p-8 rounded-tr-[100px] h-[67vh] flex flex-col
            justify-between gap-8'>
                <nav className='flex flex-col gap-6'>
                    <NavLink to={'/'} className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <RiHome4Line/>Inicio
                    </NavLink>
                    <a href='#' className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <RiDashboardFill/>DashBoard
                    </a>
                    <a href='#' className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <RiCalendarEventFill/>Eventos Actuales
                    </a>
                    <a href='#' className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-slate-900/50
                    transition-colors font-bold'>
                        <RiPieChartLine/>Reportes
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

export default SlidebarE