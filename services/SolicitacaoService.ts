import { apiClient } from './api'

const BASE_PATH = '/solicitacao'

class SolicitacaoService {
    static async getAll () {
        try {
            const apiResponse = await apiClient.get(`${BASE_PATH}/`)
            return apiResponse
        } catch (apiErrorResponse: any) {
            return apiErrorResponse.response
        }
    }

    static async delete (idSolicitacao: string) {
        try {
            const apiResponse = await apiClient.delete(`${BASE_PATH}/${idSolicitacao}`)
            return apiResponse
        } catch (apiErrorResponse: any) {
            return apiErrorResponse.response
        }
    }
}

export { SolicitacaoService }