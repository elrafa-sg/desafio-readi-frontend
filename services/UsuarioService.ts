import { apiClient } from './api'

const BASE_PATH = '/usuario'

class UsuarioService {
    static async login (email: string, senha: string) {
        try {
            const apiResponse = await apiClient.post(`${BASE_PATH}/login`, { email, senha })
            return apiResponse
        } catch (apiErrorResponse: any) {
            return apiErrorResponse.response
        }
    }
}

export { UsuarioService }