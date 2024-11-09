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

    getUsers(token) {
        return this.axios.get(`${this.url}/users`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }

    postClient(body, token) {
        return this.axios.post(`${this.url}/clients`, body, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }

    patchClient(id, body, token) {
        return this.axios.patch(`${this.url}/clients/${id}`, body, {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    }
}

export default new UsersService()
