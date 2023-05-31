import { useQuery } from 'react-query';
import EventsRepository from "../../repositories/EventsRepository";

function useGetCarrito(eventoId, asiento, seccion) {
    return useQuery(['useGetCarrito', eventoId, asiento, seccion], () =>
    EventsRepository.getCarritoInfo(eventoId, asiento, seccion)
    );
}

export { useGetCarrito };