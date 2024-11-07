import AxiosServices from './axios'

class AppointmentService extends AxiosServices {
    constructor() {
        super({
            url: '/appointments',
            config: {
                baseURL: import.meta.env.VITE_API_URL,
            }
        })
    }

    getAppointments(token) {
        return this.axios.get(this.url, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }

    postAppointment(body, token) {
        return this.axios.post(this.url, body, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }
}

export default new AppointmentService()
