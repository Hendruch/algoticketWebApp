import React, { useState, useEffect } from "react";

function SeatSelector({ seats, ZoneSelected, handleBack }) {

    const [color, setColor] = useState("");


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

    const handleSelectSeat = () => {
        alert('Asiento seleccionado')
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
                        <button onClick={handleSelectSeat} className="h-10 w-10 rounded mb-4" style={{ backgroundColor: color }} >{seat?.fila + seat?.numero_asiento}</button>
                    ))
                }
                {/* <button onClick={handleSelectSeat} className="h-10 w-10 rounded mb-4" style={{ backgroundColor: color }} >1</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >2</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >3</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >4</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >5</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >6</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >7</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >8</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >9</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >10</button>

                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >11</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >12</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >13</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >14</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >15</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >16</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >17</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >18</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >19</button>
                <button onClick={handleSelectSeat} className="h-10 w-10 rounded" style={{ backgroundColor: color }} >20</button> */}
            </div>
        </div>
    )
}
export { SeatSelector }


