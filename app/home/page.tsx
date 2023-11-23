'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdLogout } from 'react-icons/md'

import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Appbar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Fab from "@mui/material/Fab"

import { LocalStorage } from '@/utils/LocalStorage'
import { TableSolicitacoes } from '@/components/TableSolicitacoes'
import { ModalSolicitacao } from '@/components/ModalSolicitacao'
import { SolicitacaoService } from '@/services/SolicitacaoService'


export default function Home () {
  const router = useRouter()

  const [showModalSolicitacao, setShowModalSolicitacao] = useState(false)
  const [solicitacoes, setSolicitacoes] = useState([])

  const [showFeedback, setShowFeedback] = useState<{ open: boolean, text: string, type: 'success' | 'error' }>({ open: false, text: '', type: '' })

  function logoff () {
    LocalStorage.clearUserData()
    router.push('/')
  }

  async function cadastrarSolicitacao (solicitacaoData: any) {
    const solicitacaoResponse = await SolicitacaoService.create(solicitacaoData)
    if (solicitacaoResponse.status == 201) {
      setShowModalSolicitacao(false)
      setShowFeedback({ open: true, text: solicitacaoResponse.data.message, type: 'success' })
      getAll()
    }
    else {
      setShowFeedback({ open: true, text: solicitacaoResponse.data.message, type: 'error' })
    }

    setTimeout(() => {
      setShowFeedback({ open: false, text: '', type: 'error' })
    }, 3000)
  }

  async function getAll () {
    const solicitacoesResponse = await SolicitacaoService.getAll()
    if (solicitacoesResponse.status == 200) {
      setSolicitacoes(solicitacoesResponse.data)
    }
  }

  const carregarSolicitacoes = useCallback(async () => {
    getAll()
  }, [])

  useEffect(() => {
    carregarSolicitacoes()
  }, [carregarSolicitacoes])

  return (
    <>
      {showFeedback.open &&
        <div style={{ position: 'absolute', top: '80px', right: '20px' }}>
          <Alert severity={showFeedback.type} color={showFeedback.type} >
            {showFeedback.text}
          </Alert>
        </div>
      }

      <ModalSolicitacao open={showModalSolicitacao}
        closeFunction={() => setShowModalSolicitacao(false)}
        confirmFunction={(solicitacaoData: any) => cadastrarSolicitacao(solicitacaoData)}
      />

      <Appbar style={{ height: '60px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" paddingX="10px" height="100%">
          <Box>Desafio Readi Fullstack</Box>

          <Button variant='contained' color='error' onClick={() => logoff()}>
            <Box marginRight={1}>Desconectar</Box> <MdLogout size={20} />
          </Button>
        </Stack>
      </Appbar>

      <Stack paddingTop="100px" alignItems="center" >
        <TableSolicitacoes solicitacoes={solicitacoes} reloadFunction={() => getAll()} />

        <div style={{ position: 'absolute', bottom: 100, right: 20 }}>
          <Fab color='primary' variant='extended' onClick={() => {
            setShowModalSolicitacao(true)
          }}>
            Nova Solcitação
          </Fab>
        </div>
      </Stack>
    </>
  )
}
