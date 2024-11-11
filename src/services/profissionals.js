import AxiosServices from "./axios";

class ProfissionalsService extends AxiosServices {
  constructor() {
    super({
      url: "/professionals",
      config: {
        baseURL: import.meta.env.VITE_API_URL,
        "Content-Type": "application/json",
      },
    });
  }

  getProfissionals(token) {
    return this.axios.get(this.url, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      params: {
        services: true,
      }
    });
  }

  getProfessionalServices(professionalId, token) {
    return this.axios.get(`${this.url}/${professionalId}/services`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  patchProfessional(professionalId, data, token) {
    return this.axios.patch(`${this.url}/${professionalId}`, data, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  postProfessional(data, token) {
    return this.axios.post(this.url, data, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  postProfessionalService(professionalId, serviceId, token) {
    return this.axios.post(`${this.url}/${professionalId}/service/${serviceId}`, {}, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  deleteProfessionalService(professionalId, serviceId, token) {
    return this.axios.delete(`${this.url}/${professionalId}/service/${serviceId}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  }
}

export default new ProfissionalsService();
