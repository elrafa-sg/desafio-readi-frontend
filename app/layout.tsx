import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Desafio Readi - FullStack',
  description: 'Frontend do desafio full stack da Readi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
