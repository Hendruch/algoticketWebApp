function SectionRowInfo(props) {
    const sections = props.sections;
    return (
        <>
            <div className="flex items-center">
                <div style={{ backgroundColor: props.color }} className={"h-5 w-5 rounded-full mr-2"} />
                <p>Sección {props.section} </p>
            </div>
            <div className="text-center space-y-2 divide-y divide-solid ">
            {
                sections && sections.map((section) => (
                    <p key={section?.id} id={section?.id} className="py-2">Palco {section?.seccion}{section?.seccion_num}<span className="ml-10">${section?.precio}</span><button id={section?.seccion + section?.seccion_num} onClick={props.handleSeatsBySection} className="ml-10">{">"}</button></p>
                ))
            }

                {/* <p className="py-2">Palco {props.section}1<span className="ml-10">$999.99</span><button id={props.section + 1} onClick={props.handleSeatsBySection} className="ml-10">{">"}</button></p> */}
                
            </div>
        </>
    )
}
export { SectionRowInfo }