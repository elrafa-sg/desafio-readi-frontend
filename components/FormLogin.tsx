'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

import { UsuarioService } from '@/services/UsuarioService'
import { LocalStorage } from '@/utils/LocalStorage'
import { UsuarioSchema } from '../validators/UsuarioSchema'

const FormLogin = () => {
    const router = useRouter()

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<{ email: string, senha: string }>({
        resolver: zodResolver(UsuarioSchema)
    })

    const [showFeedbackAlert, setShowFeedbackAlert] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState('')

    const onSubmit: SubmitHandler<FieldValues> = async (userData) => {
        const { email, senha } = userData
        const usuarioResponse = await UsuarioService.login(email, senha)

        if (usuarioResponse.status == 200) {
            LocalStorage.setUserToken(usuarioResponse.data.access_token)
            LocalStorage.setUserEmail(usuarioResponse.data.email)

            router.push('/home')
        }
        else {
            setShowFeedbackAlert(true)
            setFeedbackMessage(usuarioResponse.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '300px', width: '25%', maxWidth: '400px' }}>
                <Paper>
                    <Stack spacing={2} padding={2}>
                        <TextField label="Email" type='email'
                            {...register('email')}
                            error={Boolean(errors.email)}
                            helperText={Boolean(errors.email) ? errors?.email?.message : undefined}
                        />

                        <TextField label="Senha" type='password'
                            {...register('senha')}
                            error={Boolean(errors.senha)}
                            helperText={Boolean(errors.senha) ? errors?.senha?.message : undefined}
                        />

                        <Button variant='contained' color='primary' type='submit'>Login</Button>
                    </Stack>
                </Paper>
            </form>

            {showFeedbackAlert &&
                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                    <Alert severity='error' color='error' >
                        {feedbackMessage}
                    </Alert>
                </div>
            }
        </>
    )
}

export { FormLogin }