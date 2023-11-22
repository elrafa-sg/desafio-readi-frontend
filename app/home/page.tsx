'use client'
import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Appbar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import { LocalStorage } from '@/utils/LocalStorage'
import { TableSolicitacoes } from '@/components/TableSolicitacoes'


export default function Home () {

  const [solicitacoes, setSolicitacoes] = useState([{ id: 1, nome: 'Nome', cpf: '123121212', telefone: '2899992399', status: 'Ativo' }])

  return (
    <>
      <Appbar style={{ height: '60px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" paddingX="10px" height="100%">
          <Box>Desafio Readi Fullstack</Box>

          <Box>
            {LocalStorage.getUserEmail()}
          </Box>
        </Stack>
      </Appbar>

      <Stack paddingTop="100px" alignItems="center" >
        <Box minWidth="80vw">
          <TableSolicitacoes solicitacoes={solicitacoes} />
        </Box>
      </Stack>
    </>
  )
}
