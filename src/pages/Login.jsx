import React, { useState, useContext } from "react";
import logo from "../assets/img/LogoLight.svg";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { sesionContext } from "../utils/sesion-context";
import { Input, Button } from "@material-tailwind/react";
import { db } from "../config/firebase-config";
import { collection, addDoc } from "firebase/firestore";

function LoginPage(props) {
  const GoogleIconURI = "https://cdn-icons-png.flaticon.com/512/720/720255.png";
  const { propsRegistrando } = props;
  const [registrando, setRegistrando] = useState(propsRegistrando);

  const { user, setUser } = useContext(sesionContext);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const usuariosCollection = collection(db, "usuario");

  const swtichRegistrando = () => {
    setRegistrando(!registrando);
    setNombre("");
    setEmail("");
    setPassword("");
    setConfPass("");
  };

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

  const verContrasena = () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        () => {
          setUser(auth.currentUser);
          navigate("/");
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  const registrarse = async () => {
    if (password === confPass) {
      if (validar_contrasena(password)) {
        try {
          await createUserWithEmailAndPassword(auth, email, password)
            .then((value) => {
              updateProfile(auth.currentUser, {
                displayName: nombre,
              });
              addDoc(usuariosCollection, {
                correo: value.user.email,
                nombre: nombre,
                uid: value.user.uid,
                rol: "cliente",
              });
              setUser(value.user);
              navigate("/");
              console.log("Usuario creado: ", value.user);
            })
        } catch (err) {
          console.error(err);
        }
      } else {
        alert(
          "La contraseña debe tener 8 caracteres como mínimo, una letra mayuscula, un caracter especial y un número"
        );
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="w-full h-full flex bg-cover">
      <div className="grid grid-cols-1 w-full lg:grid-cols-2 ">
        <div className="hidden w-full min-h-screen md:flex items-center justify-center bg-[url('src/assets/img/banner-bg.png')] bg-cover bg-center">
          <img src={logo} alt="Algoticket Logo" className="w-4/5" />
        </div>
        <div className="grid min-h-screen content-center px-6 md:px-12 lg:px-20 items-center">
          <h2 className="text-3xl font-semibold text-black text-center mb-12">
            Hola! Bienvenido
          </h2>
          <button className="w-max mx-auto" onClick={signInWithGoogle}>
            <div className="flex items-center gap-5 justify-center border border-gray-500 p-3 px-12 rounded-md">
              <img src={GoogleIconURI} className="w-5" alt="google-icon" />
              Inicia sesión con google
            </div>
            <div className="relative flex py-5 px-24 items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">o</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
          </button>
          <div className="grid w-full h-full content-around">
            {!registrando ? (
              <div>
                <div className="w-10/12 mx-auto grid">
                  <p className="font-semibold mb-5">Inicia sesión</p>
                  <div className="grid gap-8">
                    <Input
                      label="correo"
                      size="md"
                      variant="standard"
                      error={false}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      label="contraseña"
                      size="md"
                      variant="standard"
                      id="password"
                      error={false}
                      value={password}
                      icon={
                        <i
                          className="fa-solid fa-eye mb-1 text-sm"
                          style={{ marginLeft: -20 }}
                          onClick={verContrasena}
                        />
                      }
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <a
                    href="#"
                    className="text-blue-600 text-sm text-right mt-1 mb-8"
                  >
                    Olvidaste tu contraseña?
                  </a>
                  <Button variant="gradient" onClick={signIn}>
                    Iniciar sesión
                  </Button>
                  <p className="text-center text-sm mt-5">
                    No tienes cuenta?{" "}
                    <a href="#" onClick={swtichRegistrando}>
                      Regístrate
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-10/12 mx-auto grid">
                  <p className="font-semibold mb-5">Regístrate</p>
                  <div className="grid gap-5">
                    <Input
                      label="Nombre"
                      size="md"
                      variant="standard"
                      error={false}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <Input
                      label="correo"
                      size="md"
                      variant="standard"
                      error={false}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      label="contraseña"
                      size="md"
                      variant="standard"
                      id="password"
                      error={false}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      label="Confirmar contraseña"
                      size="md"
                      variant="standard"
                      id="password"
                      error={false}
                      type="password"
                      value={confPass}
                      onChange={(e) => setConfPass(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="gradient"
                    onClick={registrarse}
                    className="mt-8"
                  >
                    Registrarse
                  </Button>
                  <p className="text-center text-sm mt-5">
                    Ya tienes cuenta?{" "}
                    <a href="#" onClick={swtichRegistrando}>
                      Inicia sesión
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /*
  <div className="bg-black">
          <div className="m-auto w-4/5">
            <div className="h-1/4 mb-8">
              <img src={logo} alt="Logo" className="w-2/5 m-auto" />
              </div>

              <div className="flex">
                <button
                  onClick={signInWithGoogle}
                  className="mx-auto px-6 py-3 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline w-4 h-4 mr-3 text-gray-900 fill-current"
                    viewBox="0 0 48 48"
                    width="48px"
                    height="48px"
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  Ingresar con Google
                </button>
              </div>
  
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-main_color border-opacity-20"></div>
                <span className="flex-shrink mx-4 text-main_colo text-xs">O</span>
                <div className="flex-grow border-t border-main_color border-opacity-20"></div>
              </div>
  
              <div className="mt-4 mx-4">
                <form action="" className="">
                  <div className="mb-6 ">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Correo electrónico
                    </label>
                    <input
                      className="h-11 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="email"
                      placeholder="example@mail.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      className="h-11 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={signIn}
                    >
                      Log In
                    </button>
                    <a
                      className="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-orange-600"
                      href="#"
                    >
                      ¿Olvidaste la contraseña?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
  */
}
export default LoginPage;
