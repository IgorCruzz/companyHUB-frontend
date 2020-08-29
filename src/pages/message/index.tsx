import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Content, Title } from './styles'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export const Message: React.FC = () => {
  return (
    <Container>
      <Content>
        <Title>
          <h1>Quase lá</h1>
          <Link to="/">
            <AiOutlineArrowLeft /> Voltar para tela de login
          </Link>
        </Title>

        <p>
          Ative sua conta através do link enviado para o seu e-mail, para poder
          começar a utilizar nossos serviços.
        </p>
      </Content>
    </Container>
  )
}
