import React, { useState, useEffect } from "react";

function SeatSelector({ZoneSelected,handleBack}){

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

    return(
        <div style={{color:'white'}}>
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
                <div style={{backgroundColor:'grey'}} className="my-3 h-5 w-5 rounded ..."></div><p className="mx-5" >Disponible</p>
                <div style={{backgroundColor:color}} className="my-3 h-5 w-5 rounded ..."></div><p className="mx-5" >Ocupado</p>
            </div>
        </div>
    )
}
export { SeatSelector }


