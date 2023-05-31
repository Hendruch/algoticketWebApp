import { useQuery } from "react-query";
import EventsRepository from "../../repositories/EventsRepository";

function useGetAllEvents() {
  return useQuery(['useGetAllEvents'], () => EventsRepository.getAllEvents());
}
export { useGetAllEvents };