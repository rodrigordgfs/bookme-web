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

    postAppointment(body, token) {
        return this.axios.post(this.url, body, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }
}

export default new AppointmentService()
