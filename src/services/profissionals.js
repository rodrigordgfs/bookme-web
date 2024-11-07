import AxiosServices from './axios'

class ProfissionalsService extends AxiosServices {
    constructor() {
        super({
            url: '/professionals',
            config: {
                baseURL: import.meta.env.VITE_API_URL,
                'Content-Type': 'application/json'
            }
        })
    }

    getProfissionals(token) {
        return this.axios.get(this.url, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }

    getProfessionalServices(professionalId, token) {
        return this.axios.get(`${this.url}/${professionalId}/services`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }
}

export default new ProfissionalsService()
