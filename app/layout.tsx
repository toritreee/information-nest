import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '予定表',
  description: '予定を管理できるように',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
      <link rel="manifest" href="/manifest.json" />
    </html>
  )
}
