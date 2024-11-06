import AxiosServices from './axios'

class UsersService extends AxiosServices {
    constructor() {
        super({
            config: {
                baseURL: import.meta.env.VITE_API_URL,
            }
        })
    }

    login(body) {
        return this.axios.post(`${this.url}/auth/login`, body)
    }

    register(body) {
        return this.axios.post(`${this.url}/auth/register`, body)
    }
}

export default new UsersService()
