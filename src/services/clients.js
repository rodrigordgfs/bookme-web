import AxiosServices from "./axios";

class ClientsService extends AxiosServices {
  constructor() {
    super({
      url: "/clients",
      config: {
        baseURL: import.meta.env.VITE_API_URL,
        "Content-Type": "application/json",
      },
    });
  }

  getClients(token, params) {
    return this.axios.get(this.url, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      params,
    });
  }
}

export default new ClientsService();
