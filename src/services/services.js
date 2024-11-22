import AxiosServices from "./axios";

class ServicesService extends AxiosServices {
  constructor() {
    super({
      url: "/services",
      config: {
        baseURL: import.meta.env.VITE_API_URL,
      },
    });
  }

  getServices(token, params) {
    return this.axios.get(this.url, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      params,
    });
  }

  postService(service, token) {
    return this.axios.post(this.url, service, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  patchService(id, data, token) {
    return this.axios.patch(`${this.url}/${id}`, data, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }
}

export default new ServicesService();
