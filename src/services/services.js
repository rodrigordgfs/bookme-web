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

  getServices(token) {
    return this.axios.get(this.url, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  postService(service, token) {
    return this.axios.post(this.url, service, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  patchService(service, token) {
    return this.axios.patch(`${this.url}/${service.id}`, service, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }
}

export default new ServicesService();
