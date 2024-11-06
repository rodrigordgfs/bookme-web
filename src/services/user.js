import AxiosServices from './axios'

class UsersService extends AxiosServices {
    constructor() {
        super({
            url: '/users',
            config: {
                baseURL: import.meta.env.VITE_API_URL,
            }
        })
    }

    login(body) {
        return this.axios.post(`${this.url}/login`, body)
    }

    register(body) {
        return this.axios.post(`${this.url}/register`, body)
    }
}

export default new UsersService()
