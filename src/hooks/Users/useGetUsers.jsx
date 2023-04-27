import { useQuery } from "react-query";
import UsersRepository from "../../repositories/UsersRepository";

function useGetUsers() {
  return useQuery(["useGetUsers"], () => UsersRepository.getUsers());
}
export { useGetUsers };