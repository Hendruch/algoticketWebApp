import { useQuery } from "react-query";
import EventsRepository from "../../repositories/EventsRepository";

function usePostCarrito(asientoId, estatus, eventoId, seccionId, usuarioId) {
  return useQuery(['usePostCarrito', asientoId, estatus, eventoId, seccionId, usuarioId], () => EventsRepository.postCarrito(asientoId, estatus, eventoId, seccionId, usuarioId));
}
export { usePostCarrito };