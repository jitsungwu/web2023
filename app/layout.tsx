import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Menu from './menu'
import ThemeRegistry from './_theme/ThemeRegistry'
import { AuthContextProvider } from './account/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <AuthContextProvider>
            <Menu />
            {children}
          </AuthContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
