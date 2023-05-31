import { useState } from "react"
import { SectionRowInfo } from "./SectionRowInfo"

function SectionsInfo({ section, setSection, sections, handleSeatsBySection }) {
    
    const [color,setColor] = useState('rgb(234 179 8)');

    function handleChange(event){
        
        setSection(event.target.value);
        if (event.target.value === 'A'){
            setColor('rgb(234 179 8)');
        }
        else if(event.target.value === 'B'){
            setColor('rgb(59 130 246)');
        }
        else if(event.target.value === 'C'){
            setColor('rgb(239 68 68)');
        }
        else{
            setColor('rgb(139 92 246)');
        }
    }

    return (
        <div style={{ width: '80%' }} className="text-xl font-bold space-y-4  py-10">

            <select onChange={handleChange}>
                <option value="A">Sección A</option>
                <option value="B">Sección B</option>
                <option value="C">Sección C</option>
                <option value="D">Sección D</option>
            </select>
            
            <SectionRowInfo sections={sections} color={color} section={section} handleSeatsBySection={handleSeatsBySection} />
        </div>
    )
}
export { SectionsInfo }