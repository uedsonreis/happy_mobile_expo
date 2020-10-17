import axios from 'axios'

import { Orphanage } from '../entities'

class ServiceAPI {

    private readonly api = axios.create({ baseURL: 'http://192.168.0.31:3333/' })

    public async getOrphanages(): Promise<Orphanage[]> {
        const response = await this.api.get('orphanages')
        return response.data
    }

    public async createOrphanage(body: any): Promise<Orphanage> {
        const response = await this.api.post('orphanages', body)
        return response.data
    }

}

export default new ServiceAPI()