import React, { ReactNode } from 'react'

import { Wrapper } from './styles'
import { Header } from '../../../components/header'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  )
}
