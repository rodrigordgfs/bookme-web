import AxiosServices from "./axios";

class DashbaordService extends AxiosServices {
  constructor() {
    super({
      url: "/dashboard",
      config: {
        baseURL: import.meta.env.VITE_API_URL,
      },
    });
  }

  getTotalMonth(token) {
    return this.axios.get(`${this.url}/total-month`, {
      headers: {
        Authorization: `JWT ${token}`,
      }
    });
  }

  getAppointmentsMonth(token) {
    return this.axios.get(`${this.url}/appointments-month`, {
      headers: {
        Authorization: `JWT ${token}`,
      }
    });
  }

  getAppointmentsDay(token) {
    return this.axios.get(`${this.url}/appointments-day`, {
      headers: {
        Authorization: `JWT ${token}`,
      }
    });
  }

  getAppointmentsInterval(params, token) {
    return this.axios.get(`${this.url}/appointments-interval`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      params
    });
  }

  getServicesInterval(params, token) {
    return this.axios.get(`${this.url}/services-interval`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      params
    });
  }

  getAppointmentsCanceled(token) {
    return this.axios.get(`${this.url}/appointments-canceled`, {
      headers: {
        Authorization: `JWT ${token}`,
      }
    });
  }
}

export default new DashbaordService();
