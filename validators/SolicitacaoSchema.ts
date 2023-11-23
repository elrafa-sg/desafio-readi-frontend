import { z } from 'zod'

const SolicitacaoSchema = z.object({
    nome: z.string()
        .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
        .max(255, { message: 'O nome deve ter no máximo 255 caracteres.' }),
    cpf: z.string()
        .length(11, { message: 'O CPF deve ter 11 caracteres. Somente números.' }),
    telefone: z.string()
        .length(11, { message: 'O telefone deve ter 11 caracteres. Somente números.' }),
    dataNascimento: z.string()
        .length(10, { message: 'A data de nascimento deve ter 10 caracteres. Ex: 01/01/2000.' }),
    logradouro: z.string()
        .min(3, { message: 'O logradouro deve ter no mínimo 3 caracteres.' })
        .max(255, { message: 'O logradouro deve ter no máximo 255 caracteres.' }),
    numero: z.string()
        .min(1, { message: 'O número deve ter no mínimo 1 caractere.' })
        .max(6, { message: 'O número deve ter no máximo 6 caracteres.' }),
    cidade: z.string()
        .min(3, { message: 'O nome da cidade deve ter no mínimo 3 caracteres.' })
        .max(255, { message: 'O nome da cidade deve ter no máximo 255 caracteres.' }),
    uf: z.string()
        .length(2, { message: 'A UF deve ter 2 caracteres.' }),
    cep: z.string()
        .length(8, { message: 'O CEP deve ter 8 caracteres. Somente números.' })
})

export { SolicitacaoSchema };