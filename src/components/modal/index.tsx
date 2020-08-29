import React, { ReactNode } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Container, Content } from './styles'
import { RouteComponentProps } from '@reach/router'

interface Props extends RouteComponentProps {
  open?: boolean
  close?: () => void
  children: ReactNode
}

export const Modal: React.FC<Props> = ({ open, close, children }: Props) => {
  return (
    <Container active={open}>
      <Content>
        <button onClick={close}>
          <AiOutlineClose />
        </button>
        {children}
      </Content>
    </Container>
  )
}
