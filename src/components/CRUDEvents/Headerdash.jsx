import React from 'react'

const Header = () => {
  return (
    <header className=' flex flex-col md:flex-row items-center justify-between gap-3'>
      <h1 className=' drop-shadow-xl text-2xl md:text-4xl font-bold text-slate.-800 '>🎤Bienvenido, <span className='text-red-700/90'>Josias</span></h1>
      
      <form className='drop-shadow-xl w-full md:w-auto '>
        <div className='relative  '>
          <input type='text' className='  w-full md:w-auto bg-gray-100 rounded-full p-5 pl-8 py-1 focus:outline-none focus:shadow-outline' placeholder='Buscar...'/>
          
          <div className='absolute top-0 '>
            <svg className='fill-current w-4 text-gray-500 mt-2 ml-2' viewBox='0 0 24 24'>
              <path className='heroicon-ui' d='M10 18a8 8 0 100-16 8 8 0 000 16zm7.54-1.46l5.9 5.9a1 1 0 11-1.42 1.42l-5.9-5.9a8 8 0 111.42-1.42z'/>
            </svg>
            </div>

          </div>
      </form>
    </header>
  )
}

export default Header