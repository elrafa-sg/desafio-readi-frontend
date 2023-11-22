import { z } from 'zod'

const UsuarioSchema = z.object({
    email: z.string()
        .email({ message: 'Email inválido.' }),
    senha: z.string()
        .min(4, { message: 'A senha deve ter no mínimo 4 caracteres.' })
        .max(32, { message: 'A senha deve ter no máximo 32 caracteres.' }),
})

export { UsuarioSchema };