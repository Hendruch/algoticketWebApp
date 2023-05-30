import { useQuery } from "react-query";
import EventsRepository from "../../repositories/EventsRepository";

function useGetEvents(eventId) {
  return useQuery(['useGetEvents',eventId], () => EventsRepository.getEvents(eventId));
}
export { useGetEvents };