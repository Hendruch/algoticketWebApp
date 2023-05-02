function SectionRowInfo(props) {
    return(
    <>
        <div className="flex items-center">
            <div style={{backgroundColor: props.color }} className={"h-5 w-5 rounded-full mr-2"}/>
            <p>Sección {props.section} </p>
        </div>
        <div className="text-center space-y-2 divide-y divide-solid ">
            <p className="py-2">Palco {props.section}1<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}2<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}3<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}4<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}5<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}6<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}7<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}8<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}9<span className="ml-10">$999.99</span></p>
            <p className="py-2">Palco {props.section}<span className="ml-10">$999.99</span></p>
        </div>
    </>
    )
}
export {SectionRowInfo}