import axios from 'axios'

export default class AxiosServices {
    constructor({ url = '', config = {} }) {
        this.url = url
        this.baseConfig = config

        this.axios = axios.create(config)
    }

    get(params = {}, config = {}) {
        return this.axios.get(this.url, {
            ...config,
            params
        })
    }

    getByID(id, params = {}, config = {}) {
        return this.axios.get(`${this.url}/${id}`, {
            ...config,
            params
        })
    }

    post(data = {}, config = {}) {
        return this.axios.post(this.url, data, config)
    }

    put(id, data = {}, config = {}) {
        return this.axios.put(`${this.url}/${id}`, data, config)
    }

    patch(id, data = {}, config = {}) {
        return this.axios.patch(`${this.url}/${id}`, data, config)
    }

    delete(id, config = {}) {
        return this.axios.delete(`${this.url}/${id}`, config)
    }
}
