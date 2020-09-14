import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Container, Content, Title } from './styles'
import { Input } from '../../components/input'
import * as Yup from 'yup'
import { Validator } from '../../utils/ValidationError'
import { userCreateRequest } from '../../store/ducks/repositories/user/actions'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {
  IUserCreate,
  IUserState,
} from '../../store/ducks/repositories/user/types'

interface Errors {
  [key: string]: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector((state: IUserState) => state.user.loading)
  const dispatch = useDispatch()

  const handleSubmit = async (data: IUserCreate) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(5, 'O nome precisa ter no mínimo 5 caracteres')
          .required('Campo obrigatório'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('Campo obrigatório'),
        password: Yup.string()
          .min(6, 'O campo senha precisa ter no mínimo 6 caracteres')
          .required('Campo obrigatório'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'O campo de senha não bate')
          .required('Campo obrigatório')
          .typeError('O campo de senha não bate'),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(userCreateRequest(data))
    } catch (err) {
      const Error = Validator(err)

      formRef.current?.setErrors(Error)
    }
  }

  return (
    <Container>
      <Content>
        <Title>
          <h1>Cadastro</h1>
          <Link to="/">
            <AiOutlineArrowLeft /> Voltar para tela de login
          </Link>
        </Title>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="name" placeholder="Nome" />
          <Input name="email" type="email" placeholder="E-mail" />
          <Input name="password" type="password" placeholder="Senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar Senha"
          />

          <button type="submit">
            {loading ? 'Carregando...' : 'Cadastrar'}
          </button>
        </Form>
      </Content>
    </Container>
  )
}

export default SignUp
