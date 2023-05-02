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


function SeatSelector(){

    const handleSeatsBySection = (event) => {
        alert("Selecciono la zona : " + event.target.id)
      };

    return(
        <div className="bg-white w-full h-full ">
          <div class="grid grid-cols-7 gap-4 text-center">
             {/* Zona A */} 
             <div class="col-span-2 ..."><button onClick={handleSeatsBySection} >A1</button></div>
            <div class="..."><button onClick={handleSeatsBySection} >A2</button></div>
            <div class="..."></div>
            <div class="..."><button onClick={handleSeatsBySection} >A3</button></div>
            <div class="col-span-2 ..."><button onClick={handleSeatsBySection} >A4</button></div>
            {/* Zona B */} 
            <div class="col-span-2 ..."><button onClick={handleSeatsBySection} ><B1/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><B2/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><B3/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><B4/></button></div>
            <div class="col-span-2 ..."><button onClick={handleSeatsBySection} ><B5/></button></div>
            {/* Zona C */} 
            <div class="col-span-2 ..."><button onClick={handleSeatsBySection} ><C1/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><C2/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><C3/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><C4/></button></div>
            <div class="col-span-2 ..."><button onClick={handleSeatsBySection} ><C5/></button></div>
            {/* Zona D */}
            <div class="..."><button onClick={handleSeatsBySection} ><D1/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><D2/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><D3/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><D4/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><D5/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><D6/></button></div>
            <div class="..."><button onClick={handleSeatsBySection} ><D7/></button></div>
          </div>
        </div> 
    )
}

export { SeatSelector }