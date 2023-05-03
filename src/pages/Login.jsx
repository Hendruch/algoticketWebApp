import React from "react";
import logo from "../assets/react.svg"

function LoginPage(){
    return(
        <div className="w-screen h-screen flex bg-[url('src/assets/img/banner-bg.png')] bg-cover">
            <div className="w-1/4 h-3/5 bg-opacity-80 bg-black m-auto rounded-2xl text-white flex">
               <div className="m-auto w-4/5">
                    <div className="h-1/4 mb-8">
                        <img src={logo} alt="Logo" className="w-2/5 m-auto" />
                        {/* <p className="text-3xl mt-4 text-center">Login</p> */}
                    </div>

                    <div className="mt-4 mx-4">
                        <form action="" className="">
                            <div className="mb-6 ">
                                <label className="block text-sm font-bold mb-2" for="username">
                                    Correo electrónico
                                </label>
                                <input className="h-11 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="example@mail.com" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" for="password">
                                    Contraseña
                                </label>
                                <input className="h-11 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Log In
                                </button>
                                <a className="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-orange-600" href="#">
                                    ¿Olvidaste la contraseña?
                                </a>
                            </div>
                        </form>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default LoginPage;