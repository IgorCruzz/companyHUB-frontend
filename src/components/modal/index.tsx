import React, { ReactNode } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Container, Content } from './styles'
import { RouteComponentProps } from '@reach/router'

interface Props extends RouteComponentProps {
  close?: () => void
  children: ReactNode
}

const Modal: React.FC<Props> = ({ close, children }: Props) => {
  return (
    <Container role="modal">
      <Content>
        <button role="close" onClick={close}>
          <AiOutlineClose />
        </button>
        {children}
      </Content>
    </Container>
  )
}

export default Modal
