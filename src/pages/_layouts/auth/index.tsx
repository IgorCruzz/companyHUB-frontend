import React, { ReactNode } from 'react'

import { Wrapper } from './styles'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>
}
