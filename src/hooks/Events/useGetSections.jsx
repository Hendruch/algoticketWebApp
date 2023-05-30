import { useQuery } from 'react-query';
import EventsRepository from "../../repositories/EventsRepository";

function useGetSections(seccion, eventoID) {
    return useQuery(['useGetSections', seccion, eventoID], () =>
    EventsRepository.getSections(seccion, eventoID)
    );
}

export { useGetSections };
