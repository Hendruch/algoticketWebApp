import { useQuery } from 'react-query';
import EventsRepository from "../../repositories/EventsRepository";

function useGetSeats(seccion, seccion_num, eventoID) {
    return useQuery(['useGetSeats', seccion,seccion_num, eventoID], () =>
    EventsRepository.getSeatsBySections(seccion, seccion_num, eventoID)
    );
}

export { useGetSeats };
