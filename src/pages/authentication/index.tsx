import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Content } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { authRequest } from '../../store/ducks/repositories/auth/actions'
import { IAuthState } from '../../store/ducks/repositories/auth/types'

const Authentication: React.FC = () => {
  const params: { token: string } = useParams()
  const dispatch = useDispatch()
  const loading = useSelector((state: IAuthState) => state.auth.loading)

  return (
    <Container>
      <Content>
        <p>Clique no botão abaixo para ativar sua conta</p>
        <button
          type="button"
          onClick={() => dispatch(authRequest({ token: params.token }))}>
          {loading ? 'Carregando...' : 'Ativar conta'}
        </button>
      </Content>
    </Container>
  )
}
export default Authentication
