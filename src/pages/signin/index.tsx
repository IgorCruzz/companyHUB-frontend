import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Container, Content } from './styles'
import { Input } from '../../components/input'
import * as Yup from 'yup'
import { signInRequest } from '../../store/ducks/repositories/signin/actions'
import {
  ILogin,
  ILoginState,
} from '../../store/ducks/repositories/signin/types'
import { Validator } from '../../utils/ValidationError'
interface Errors {
  [key: string]: string
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector((state: ILoginState) => state.signIn.loading)
  const dispatch = useDispatch()

  const handleSubmit = async (data: ILogin) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Campo obrigatório'),
        password: Yup.string().required('Campo obrigatório'),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(signInRequest(data))
    } catch (err) {
      const Error = Validator(err)

      formRef.current?.setErrors(Error)
    }
  }

  return (
    <Container>
      <Content>
        <h1>companyHUB!!!</h1>

        <Form onSubmit={handleSubmit} ref={formRef} data-testid="form">
          <Input name="email" type="email" placeholder="E-mail" />

          <Input name="password" type="password" placeholder="Senha" />

          <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
        </Form>

        <p>
          Não possui conta? <Link to="/signup">Criar conta gratuita</Link>
        </p>
      </Content>
    </Container>
  )
}

export default Signin
