import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Content } from './styles'
import { RouteComponentProps } from '@reach/router'

interface Props extends RouteComponentProps {
  open?: boolean
  close?: () => void
  data: {
    company_id?: number
    product_id?: number
    id: number
  }
  action: any
}

const Dialog: React.FC<Props> = ({ close, data, action }) => {
  const dispatch = useDispatch()

  return (
    <Container role="dialog">
      <Content>
        <p>Voce realmente deseja fazer isso?</p>
        <div>
          <button id="cancelar" type="button" onClick={close}>
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(action(data))
            }}>
            Deletar
          </button>
        </div>
      </Content>
    </Container>
  )
}

export default Dialog
