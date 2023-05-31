import React from "react";
import Concert_card from "../components/Concert_card";
import { Navbar } from "../components/General/NavBar";
import { useGetAllEvents } from "../hooks/Events/useGetAllEvents";

function Home() {
  const { data, refetch } = useGetAllEvents();
  return (
    <>
    <Navbar/>
      <div className="jw-screen ustify-center items-center">
        <div className="max-w-screen h-screen home_banner flex items-center justify-center md:justify-normal mx-auto p-3 md:px-32">
          <div className="flex-row">
            <h1 className="text-white font-bold text-center md:text-left banner_tittle_1">
              La entrada
            </h1>
            <h1 className="text-white font-bold text-center md:text-left banner_tittle_2">
              A tus eventos
            </h1>
            <h1 className="text-white font-bold  text-center md:text-left banner_tittle_3">
              Favoritos
            </h1>
          </div>
        </div>
        <div className="max-w-screen home_section flex items-center justify-center md:justify-normal mx-auto p-3 md:px-32">
          <div className="flex-row">
            <h1 className="font-bold text-center md:text-left banner_tittle_2 mt-12">
              Tus eventos favoritos
            </h1>
            <div className="w-full items-center justify-center">
                {
                    data && data.map((card) => (
                      <Concert_card key={card?.id} card={card} />
                    ))
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
