'use client'
import { useState } from 'react'
import Stack from '@mui/material/Stack'

import { DataGrid, GridColDef, } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

import { SolicitacaoService } from '@/services/SolicitacaoService'

interface SolicitacoesProps {
    solicitacoes: any[],
    reloadFunction: Function
}

const TableSolicitacoes = (props: SolicitacoesProps) => {
    const [showFeedbackAlert, setShowFeedbackAlert] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState('')

    async function deleteSolicitacao (solicitacaoId: string) {
        const solicitacaoResponse = await SolicitacaoService.delete(solicitacaoId)
        props.reloadFunction()
        setShowFeedbackAlert(true)
        setFeedbackMessage(solicitacaoResponse.data.message)

        setTimeout(() => {
            setShowFeedbackAlert(false)
            setFeedbackMessage('')
        }, 3000)
    }

    const dataTableColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'nome', headerName: 'Nome' },
        { field: 'cpf', headerName: 'CPF' },
        { field: 'telefone', headerName: 'Telefone' },
        { field: 'status', headerName: 'Status' },
        {
            field: 'actions', headerName: 'Actions', minWidth: 200, renderCell: (item) => {
                return (
                    <Stack direction="row" width="100%" spacing={2}>
                        <Button color='error' variant='contained' onClick={() => deleteSolicitacao(item.row.id)}>
                            Deletar
                        </Button>
                    </Stack>
                )
            }
        },
    ]


    return (
        <>
            {showFeedbackAlert &&
                <div style={{ position: 'absolute', top: '80px', right: '20px' }}>
                    <Alert severity='error' color='error' >
                        {feedbackMessage}
                    </Alert>
                </div>
            }

            <DataGrid autoHeight
                rows={props.solicitacoes}
                columns={dataTableColumns}
            />
        </>
    )
}

export { TableSolicitacoes }