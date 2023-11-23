'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdLogout } from 'react-icons/md'
import Stack from '@mui/material/Stack'
import Appbar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import { LocalStorage } from '@/utils/LocalStorage'
import { TableSolicitacoes } from '@/components/TableSolicitacoes'
import { SolicitacaoService } from '@/services/SolicitacaoService'


export default function Home () {
  const router = useRouter()

  const [solicitacoes, setSolicitacoes] = useState([{ id: 1, nome: 'Nome', cpf: '123121212', telefone: '2899992399', status: 'Ativo' }])

  function logoff () {
    LocalStorage.clearUserData()
    router.push('/')
  }

  const carregarSolicitacoes = useCallback(async () => {
    const solicitacoesResponse = await SolicitacaoService.getAll()
    if (solicitacoesResponse.status == 200) {
      setSolicitacoes(solicitacoesResponse.data)
    }
  }, [])

  useEffect(() => {
    carregarSolicitacoes()
  }, [carregarSolicitacoes])

  return (
    <>
      <Appbar style={{ height: '60px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" paddingX="10px" height="100%">
          <Box>Desafio Readi Fullstack</Box>

          <Button variant='contained' color='error' onClick={() => logoff()}>
            <Box marginRight={1}>Desconectar</Box> <MdLogout />
          </Button>
        </Stack>
      </Appbar>

      <Stack paddingTop="100px" alignItems="center" >
        <TableSolicitacoes solicitacoes={solicitacoes} />
      </Stack>
    </>
  )
}
