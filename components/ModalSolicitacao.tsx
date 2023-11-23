import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { SolicitacaoSchema } from '@/validators/SolicitacaoSchema'
import { SolicitacaoService } from '@/services/SolicitacaoService'


interface ModalSolicitacaoProps {
    open: boolean,
    closeFunction: Function,
    confirmFunction: Function
}

const ModalSolicitacao = (props: ModalSolicitacaoProps) => {

    const router = useRouter()

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<{
        nome: string, cpf: string, telefone: string, dataNascimento: string,
        logradouro: string, numero: string, cidade: string, uf: string,
        cep: string, status: string
    }>({
        resolver: zodResolver(SolicitacaoSchema)
    })

    const onSubmit: SubmitHandler<FieldValues> = async (solicitacaoData) => {
        props.confirmFunction(solicitacaoData)
    }

    return (
        <Modal open={props.open} onClose={() => props.closeFunction()}   >
            <Stack alignItems="center" marginTop="100px">
                <Paper>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ padding: 4, maxWidth: '600px' }}>
                            <Grid container gap={2} justifyContent="space-between">
                                <Grid item xs={7}>
                                    <TextField label="Nome" type='text' fullWidth
                                        {...register('nome')}
                                        error={Boolean(errors.nome)}
                                        helperText={Boolean(errors.nome) ? errors?.nome?.message : undefined}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField label="CPF" type='text' fullWidth
                                        {...register('cpf')}
                                        error={Boolean(errors.cpf)}
                                        helperText={Boolean(errors.cpf) ? errors?.cpf?.message : undefined}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField label="Data Nascimento" type='date' fullWidth
                                        {...register('dataNascimento')}
                                        error={Boolean(errors.dataNascimento)}
                                        helperText={Boolean(errors.dataNascimento) ? errors?.dataNascimento?.message : undefined}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField label="Telefone" type='tel' fullWidth
                                        {...register('telefone')}
                                        error={Boolean(errors.telefone)}
                                        helperText={Boolean(errors.telefone) ? errors?.telefone?.message : undefined}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField label="CEP" type='text'
                                        {...register('cep')}
                                        error={Boolean(errors.cep)}
                                        helperText={Boolean(errors.cep) ? errors?.cep?.message : undefined}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <TextField label="UF" type='text' fullWidth
                                        {...register('uf')}
                                        error={Boolean(errors.uf)}
                                        helperText={Boolean(errors.uf) ? errors?.uf?.message : undefined}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField label="Cidade" type='text' fullWidth
                                        {...register('cidade')}
                                        error={Boolean(errors.cidade)}
                                        helperText={Boolean(errors.cidade) ? errors?.cidade?.message : undefined}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField label="Logradouro" type='text' fullWidth
                                        {...register('logradouro')}
                                        error={Boolean(errors.logradouro)}
                                        helperText={Boolean(errors.logradouro) ? errors?.logradouro?.message : undefined}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <TextField label="Número" type='text' fullWidth
                                        {...register('numero')}
                                        error={Boolean(errors.numero)}
                                        helperText={Boolean(errors.numero) ? errors?.numero?.message : undefined}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container gap={12} marginTop={4}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                                    <Button color="error" variant='contained'
                                        onClick={() => props.closeFunction()}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button color="success" variant='contained' type='submit'>
                                        Cadastrar
                                    </Button>
                                </Stack>
                            </Grid>
                        </Box>
                    </form>
                </Paper>
            </Stack>
        </Modal >
    )
}

export { ModalSolicitacao }