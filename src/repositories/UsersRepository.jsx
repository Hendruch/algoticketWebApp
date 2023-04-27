import api from "../services/api";

class UsersRepository {
  async getUsers() {
    const response = await api.get(`algoticket/usuario`);
    return response.data;
  }
}

export default new UsersRepository();