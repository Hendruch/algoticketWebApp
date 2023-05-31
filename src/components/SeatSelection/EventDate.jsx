function EventDate({data}) {
  return (
    <div className="flex h-auto bg-amber-500 pl-32 w-100vh">
      <div className="py-7 pr-4">
        <p className="text-3xl font-bold">{data?.mes}</p>
        <p className="text-5xl font-bold">{data?.day}</p>
      </div>
      <div className="py-7">
        <h1 className="text-5xl font-bold">{data?.artista}</h1>
        <p className="text-lg font-bold">
          {data?.lugar.ciudad}, {data?.lugar.entidad_federativa} | {data?.lugar.inmueble} | {data?.time}
        </p>
      </div>
    </div>
  );
}
export { EventDate };
