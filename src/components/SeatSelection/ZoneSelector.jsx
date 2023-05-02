import React, { useState } from "react";

import { A1 } from "./Sections/A/A1";
import { A2 } from "./Sections/A/A2";
import { A3 } from "./Sections/A/A3";
import { A4 } from "./Sections/A/A4";

import { B1 } from "./Sections/B/B1";
import { B2 } from "./Sections/B/B2";
import { B3 } from "./Sections/B/B3";
import { B4 } from "./Sections/B/B4";
import { B5 } from "./Sections/B/B5"

import { C1 } from "./Sections/C/C1";
import { C2 } from "./Sections/C/C2";
import { C3 } from "./Sections/C/C3";
import { C4 } from "./Sections/C/C4";
import { C5 } from "./Sections/C/C5";

import { D1 } from "./Sections/D/D1";
import { D2 } from "./Sections/D/D2";
import { D3 } from "./Sections/D/D3";
import { D4 } from "./Sections/D/D4";
import { D5 } from "./Sections/D/D5";
import { D6 } from "./Sections/D/D6";
import { D7 } from "./Sections/D/D7";

import { SeatSelector } from "./SeatSelector";


function ZoneSelector(){

    const [showZoneSelector, setZoneSelector] = useState(true);
    const [ZoneSelected, setZoneSelected] = useState("");

    const handleSeatsBySection = (event) => {
        setZoneSelector(false);
        setZoneSelected( event.target.id.toUpperCase());
    };

    const handleBack = () => {
        setZoneSelector(true);
    }

    return(
        <div className="bg-black w-full h-full pt-5 px-5">
        {showZoneSelector?
            (<div className="grid grid-cols-7 text-center ">
                <div style={{color:'white'}}className="col-span-7 ..." ><p>Escenario</p></div>
                    {/* Zona A */} 
                    <div className="pt-2 col-span-7 ...">
                    <button onClick={handleSeatsBySection} ><A1/></button>
                        <button onClick={handleSeatsBySection} ><A2/></button>
                        <button onClick={handleSeatsBySection} ><A3/></button>
                        <button onClick={handleSeatsBySection} ><A4/></button>
                    </div>
                    {/* Zona B */} 
                    <div className="col-span-7 ...">
                        <button onClick={handleSeatsBySection} ><B1/></button>
                        <button onClick={handleSeatsBySection} ><B2/></button>
                        <button onClick={handleSeatsBySection} ><B3/></button>
                        <button onClick={handleSeatsBySection} ><B4/></button>
                        <button onClick={handleSeatsBySection} ><B5/></button>
                    </div>
                    {/* Zona C */} 
                    <div className="col-span-7 ...">
                        <button onClick={handleSeatsBySection} ><C1/></button>
                        <button onClick={handleSeatsBySection} ><C2/></button>
                        <button onClick={handleSeatsBySection} ><C3/></button>
                        <button onClick={handleSeatsBySection} ><C4/></button>
                        <button onClick={handleSeatsBySection} ><C5/></button>
                    </div>
                    {/* Zona D */}
                    <div className="..."><button onClick={handleSeatsBySection} ><D1/></button></div>
                    <div className="..."><button onClick={handleSeatsBySection} ><D2/></button></div>
                    <div className="..."><button onClick={handleSeatsBySection} ><D3/></button></div>
                    <div className="..."><button onClick={handleSeatsBySection} ><D4/></button></div>
                    <div className="..."><button onClick={handleSeatsBySection} ><D5/></button></div>
                    <div className="..."><button onClick={handleSeatsBySection} ><D6/></button></div>
                    <div className="..."><button onClick={handleSeatsBySection} ><D7/></button></div>
                </div>
            ):(
                <SeatSelector ZoneSelected={ZoneSelected} handleBack={handleBack}/>
              )
        }
        </div> 
    )
}

export { ZoneSelector }