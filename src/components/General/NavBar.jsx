import { useState } from "react";
import AlgoTicketLogo from '../../assets/img/AlgoTicketLogo.png'
function Navbar() {

  const [userInfo,SetuserInfo] = useState(false);
  const [Menu,SetMenu] = useState(true);

  function ShowUserInfo(){
    SetuserInfo(!userInfo);
  }

  function ShowMenu(){
    SetMenu(!Menu);
  }

  return (
  <div>
      <nav class="bg-white border-gray-200 ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
              <img src={AlgoTicketLogo} class="h-12 mr-3 pl-32" alt="Flowbite Logo" />
          </a>
          
          <div class="flex items-center md:order-2">
              <input className={"w-auto b-black"} placeholder="Buscar"/>
              <button onClick={ShowUserInfo} type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
              </button>
          
              <button onClick={ShowMenu} data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>

              <div style={{display:userInfo ? 'block' : 'none', right: 0, top: 55 }} class="z-50 my-1 t-10 text-base list-none bg-white divide-y divide-gray-100  shadow dark:bg-gray-700 dark:divide-gray-600 w-auto absolute ..." id="user-dropdown">
                <div class="px-4 py-3">
                  <span class="block text-sm text-gray-900 dark:text-white">Eduardo Varela</span>
                  <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">algoTicke@mail.com</span>
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                  </li>
                </ul>
              </div>
          
          </div>
          
          <div style={{display:Menu ? 'block' : 'none'}} class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-zinc-100 md:dark:bg-white dark:border-white">
              <li>
                <a href="#" class="text-xl font-bold block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-amber-500 dark:hover:bg-amber-500 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Eventos</a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
     
      
  </div>

  );
}
export { Navbar };
