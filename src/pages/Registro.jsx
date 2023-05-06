import React, { useState } from "react";
import logo from "../assets/img/AlgoTicketLogo.png"
import {auth, googleProvider} from "../config/firebase-config"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from 'react-router';
import {db} from "../config/firebase-config";
import {getDocs, collection, addDoc} from "firebase/firestore";

function RegistroPage(){

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");

    const navigate = useNavigate();

    const usuariosCollection = collection(db, "usuario");

    const validar_contrasena = (password) => {
        var re = {
            capital: /(?=.*[A-Z])/,
            minus: /(?=.*[a-z])/,
            length: /(?=.{7,40}$)/,
            specialChar: /[ -\/:-@\[-\`{-~]/,
            digit: /(?=.*[0-9])/,
        };
        return (
            re.capital.test(password) &&
            re.minus.test(password) &&
            re.length.test(password) &&
            re.specialChar.test(password) &&
            re.digit.test(password)
        );
    };

    const registrarse = async () => {
        if(password === confPass){
            if(validar_contrasena(password)){
                try{
                    await createUserWithEmailAndPassword(auth, email, password).then((value) => {
                        addDoc(usuariosCollection, {
                            correo: value.user.email,
                            nombre: nombre,
                            uid: value.user.uid,
                            rol: "cliente"
                        });
                        navigate("/");
                    });
                }catch (err){
                    console.error(err);
                }
            }else{
                alert('La contraseña debe tener 8 caracteres como mínimo, una letra mayuscula, un caracter especial y un número');
            }
        }else{
            alert('Las contraseñas no coinciden');
        }
    };
    
    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider).then((value) => {
                addDoc(usuariosCollection, {
                    correo: value.user.email,
                    nombre: value.user.displayName,
                    uid: value.user.uid,
                    rol: "cliente"
                });
                navigate("/");
            });
        }catch (err){
            console.error(err);
        }
    };

    return(
        <div className="w-screen h-screen flex bg-[url('src/assets/img/banner-bg.png')] bg-cover">
            <div className="w-1/4 py-8 bg-opacity-80 bg-black m-auto rounded-2xl text-white flex">
               <div className="m-auto w-4/5">
                    <div className="h-1/6 mb-4">
                        <img src={logo} alt="Logo" className="w-2/5 m-auto h-10" />
                    </div>

                    <div className="flex">
                        <button onClick={signInWithGoogle} className="mx-auto px-6 py-3 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" className="inline w-4 h-4 mr-3 text-gray-900 fill-current" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>Ingresar con Google</button>
                    </div>
                        
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-main_color border-opacity-20"></div>
                        <span className="flex-shrink mx-4 text-main_colo text-xs">O</span>
                        <div className="flex-grow border-t border-main_color border-opacity-20"></div>
                    </div>

                    <div className="">
                        <form action="" className="">
                            <div className="mb-6 ">
                                <label className="block text-sm font-bold mb-2" htmlFor="username">
                                    Nombre
                                </label>
                                <input className="h-11 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Juan Perez" onChange={(e) => setNombre(e.target.value)}/>
                            </div>
                            <div className="mb-6 ">
                                <label className="block text-sm font-bold mb-2" htmlFor="username">
                                    Correo electrónico
                                </label>
                                <input className="h-11 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="correo" type="email" placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input className="h-11 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" htmlFor="password">
                                    Confirmar contraseña
                                </label>
                                <input className="h-11 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="passwordconf" type="password" placeholder="******************" onChange={(e) => setConfPass(e.target.value)}/>
                            </div>
                            <div className="block">
                                <button className="w-full bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3" type="button" onClick={registrarse}>
                                    Registrarse
                                </button>
                                <a className="font-bold text-sm text-yellow-500 hover:text-orange-600" href="/login">
                                    Inicar sesión
                                </a>
                            </div>
                        </form>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default RegistroPage;