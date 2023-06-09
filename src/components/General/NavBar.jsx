import { useContext, Fragment, useState, useEffect } from "react";
import Logo from "../../assets/img/LogoLight.svg";
import { Link } from "react-router-dom";
import { sesionContext } from "../../utils/sesion-context";
import { getAuth, signOut } from "firebase/auth";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 import { CarritoContext } from '../../App';
 import { usePostCarrito } from "../../hooks/Events/usePostCarrito";

function Navbar() {

  const { carrito, Setcarrito } = useContext(CarritoContext);
  const { user } = useContext(sesionContext);
  const { setUser } = useContext(sesionContext);
  const auth = getAuth();
  const {carritos, crearcarrito} = usePostCarrito();

  console.log("Current user: ",auth.currentUser)
  function cerrarSesion() {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  function handleSearch() {
    //usePostCarrito()
  }

  //============= Cambiar el estado del navbar para movil
  const toggleCollapse = () => {
    const navbar = document.getElementById("navbar-default");
    navbar.classList.toggle("hidden");
  };

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const addCarrito = () =>{
    //const asientos = carrito.map(item => item?.asiento);
    crearcarrito(carrito[0]?.asiento,true,carrito[0]?.evento,carrito[0]?.id_seccion,carrito[0]?.usuario);
    setOpen(!open);
  }
  console.log(carrito)

  const eliminarItem = (asiento) => {
    const nuevoCarrito = carrito.filter((item) => item.asiento !== asiento);
    Setcarrito(nuevoCarrito);
  };

  useEffect(() => {
    console.log("Carrito state updated:", carrito);
  }, [carrito]);

  return (
    <div>
      <nav className="fixed w-full z-50 bg-black">
        <div className="flex flex-wrap justify-between mx-auto p-4 items-center">
          <div className="flex items-center ml-5 xl:m-auto">
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                className="h-12 mr-3 whitespace-nowrapself-center"
              />
            </Link>
          </div>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-auto mr-5 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleCollapse}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fillRule="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current text-white"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div
            className="hidden w-full xl:w-auto self-center m-auto"
            id="navbar-default"
          >
            <div>
              {auth.currentUser ? (
                <div className="col xl:hidden">
                  <li className="pr-5">
                    <p className="block text-sm font-semibold text-white text-right">
                      {auth.currentUser.displayName}
                    </p>
                  </li>
                  <li className="pr-5">
                    <Link
                      to="/#"
                      className="block text-sm font-semibold text-white text-right hover:text-blue-500"
                      onClick={cerrarSesion}
                    >
                      Cerrar sesión
                    </Link>
                  </li>
                </div>
              ) : (
                <div className="col xl:hidden">
                  <li className="pr-5">
                    <Link
                      to="/registro"
                      className="block text-sm font-semibold text-white text-right hover:text-blue-500"
                    >
                      Unirse ahora
                    </Link>
                  </li>
                  <li className="pr-5">
                    <Link
                      to="/login"
                      className="block text-sm font-semibold text-white rounded text-right hover:text-blue-500"
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </div>

          <div className="hidden xl:block">
            <div className="relative flex gap-5 items-center text-gray-600 focus-within:text-gray-400">
              <a href="#" className="font-semibold text-white">
                Eventos{" "}
              </a>
              <input
                className="block w-full pl-9 py-1 border border-transparent rounded-full leading-5 bg-white placeholder-slate-300 focus:outline-none focus:bg-white focus:placeholder-gray-400 text-white focus:text-sky-950 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                placeholder="Buscar"
                type="search"
                id="search"
                onChange={handleChange}
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  className="p-1 focus:outline-none focus:shadow-outline"
                  onClick={handleSearch}
                >
                  <i className="fa-solid fa-magnifying-glass text-slate-300 focus:text-sky-950"></i>
                </button>
              </span>
              <a href="#" onClick={handleOpen} className="font-semibold text-white">
              <i className="fa-solid fa-cart-shopping" />
              </a>
            </div>
          </div>

          <ul className="hidden font-medium self-center m-auto xl:flex flex-col p-1 xl:p-0 mt-4  xl:flex-row xl:space-x-6 xl:mt-0 xl:border-0">
            {auth.currentUser ? (
              <>
                <div className="xl:flex items-center mt-2">
                  <li className="py-2 mx-8">
                    <p className="block py-2 pl-3 pr-5 text-sm text-white rounded xl:p-0 text-right">
                      {auth.currentUser.displayName}
                    </p>
                  </li>
                  <li className="py-2">
                    <Link
                      onClick={cerrarSesion}
                      className="block py-1 pl-3 pr-5 text-sm text-white rounded xl:p-0 text-right hover:text-blue-500"
                    >
                      Cerrar sesión
                    </Link>
                  </li>
                </div>
              </>
            ) : (
              <div className="xl:flex place-content-end mt-2">
                <li>
                  <Link
                    to="/registro"
                    className="block text-sm font-semibold text-white p-2 xl:px-3 mx-3 xl:hover:bg-sky-900 rounded-full text-right"
                  >
                    Unirse ahora
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block text-sm font-semibold text-white xl:hover:bg-sky-900 p-2 px-3 xl:border border-solid border-white rounded-full text-right"
                  >
                    Iniciar sesión
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
      <Fragment>
        <Dialog open={open} handler={handleOpen} size="xl">
          <DialogHeader>Carrito de compras</DialogHeader>
          <DialogBody divider >
          <div className="container mx-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Asiento</th>
                  <th className="px-4 py-2">Sección</th>
                  <th className="px-4 py-2">Precio</th>
                  <th className="px-4 py-2">Evento</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  carrito && carrito.map((carrito) => (
                    <tr key={carrito?.asiento} className="text-center">
                      <td className="border px-4 py-2">{carrito?.asiento_nombre}</td>
                      <td className="border px-4 py-2">{carrito?.seccion}</td>
                      <td className="border px-4 py-2">${carrito?.precio}</td>
                      <td className="border px-4 py-2">{carrito?.evento_nombre}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => eliminarItem(carrito?.asiento)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>))
                }
                </tbody>
            </table>
          </div>

          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cerrar</span>
            </Button>
            <Button variant="gradient" color="orange" onClick={addCarrito}>
              <span>Pagar</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
}
export { Navbar };
