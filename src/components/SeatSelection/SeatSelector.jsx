import React, { useState, useEffect, useContext } from "react";
import { CarritoContext } from '../../App';

function SeatSelector({ seats, ZoneSelected, handleBack, eventID}) {

    const [color, setColor] = useState("");
    const { carrito, Setcarrito } = useContext(CarritoContext);

    useEffect(() => {
        if (/A/.test(ZoneSelected)) {
            setColor("#EAB308");
        } else if (/B/.test(ZoneSelected)) {
            setColor("#3B82F6");
        } else if (/C/.test(ZoneSelected)) {
            setColor('#EF4444');
        } else {
            setColor('#8B5CF6');
        }
    })

    const handleSelectSeat = (event) => {
        const newItem = {
            asiento: event.target.id,
            estatus:true,
            evento: eventID,
            seccion: ZoneSelected,
            usuario:'Eduardo Varela',
            precio:'800'
          };
        Setcarrito([...carrito,newItem]);  
        console.log(carrito);
    }

    return (
        <div style={{ color: 'white' }} className="bg-black w-full h-full pt-5 px-5">
            <div className="flex">
                <button onClick={handleBack}  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    Go back
                </button>
                <h2 className="pl-20" >Bienvenido a la zona {ZoneSelected}</h2>
            </div>
            <div className="flex items-center my-5">
                <div style={{ backgroundColor: 'grey' }} className="my-3 h-5 w-5 rounded ..."></div><p className="mx-5" >Disponible</p>
                <div style={{ backgroundColor: color }} className="my-3 h-5 w-5 rounded ..."></div><p className="mx-5" >Ocupado</p>
            </div>
            <div className="grid grid-cols-10">

                {
                    seats && seats[0].rango_asientos.map((seat) => (
                        <button key={seat?.id} id={seat?.id} onClick={handleSelectSeat} className="h-10 w-10 rounded mb-4" style={{ backgroundColor: color }} >{seat?.fila + seat?.numero_asiento}</button>
                    ))
                }
            </div>
        </div>
    )
}
export { SeatSelector }


