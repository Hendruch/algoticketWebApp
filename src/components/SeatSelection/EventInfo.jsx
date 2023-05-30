function EventInfo ({data}){
    return(
        <div className="space-y-4 p-10 text-xl" >
            <p>Límite de edad: A partir de {data?.limite_edad} años</p>
            <p>Paga boleto a partir de : A partir de {data?.pago_apartir} años</p>
            <p>Restricciones : {data?.restricciones}</p>
            <p>Límite de acceso : {data?.limite_acceso} personas</p>
            <p>Servicios : {data?.services}</p>
            <p>Duración aproximada : {data?.duracion} horas</p>
            <p>Página oficial : <a className="underline underline-offset-1" href={`${data?.pagina}`} target="_blank" >{data?.pagina}</a></p>
            <p>Personas con discapacidad: Capacidad de {data?.personas_discapacidad} personas</p>
            <p>Descripción : {data?.descripcion} </p>
        </div>
    )
}
export {EventInfo}