import { apiClient } from './api'

const BASE_PATH = '/solicitacao'

class SolicitacaoService {
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