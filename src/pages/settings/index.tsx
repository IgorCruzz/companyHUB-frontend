import React, { useRef } from 'react'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Container, Content } from './styles'
import { Input } from '../../components/input'
import { FormHandles } from '@unform/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  IUserUpdate,
  IUserState,
} from '../../store/ducks/repositories/user/types'
import {
  userUpdateRequest,
  userDelete,
} from '../../store/ducks/repositories/user/actions'
import { Validator } from '../../utils/ValidationError'

interface Errors {
  [key: string]: string
}

const Settings: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector((state: IUserState) => state.user.loading)
  const profile = useSelector((state: IUserState) => state.user.profile)
  const dispatch = useDispatch()

  const handleSubmit = async (data: IUserUpdate) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().min(5, 'O nome precisa ter no mínimo 5 caracteres'),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(
          6,
          'A senha precisa ter no mínimo 6 caracteres'
        ),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword: any, field: any) =>
            oldPassword ? field.required('Campo obrigatório') : field
          ),
        confirmPassword: Yup.string().when(
          'password',
          (password: any, field: any) =>
            password
              ? field
                  .required('Campo obrigatório')
                  .oneOf([Yup.ref('password'), 'oii'])
              : field
        ),
      })

      const { email, name, ...password } = data

      const validateData = {
        email,
        name,
        ...(password.oldPassword ? password : {}),
      }

      await schema.validate(validateData, { abortEarly: false })

      dispatch(
        userUpdateRequest({
          id: profile.id,
          ...validateData,
        })
      )
    } catch (err) {
      const Error = Validator(err)

      formRef.current?.setErrors(Error)
    }
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} ref={formRef} initialData={profile}>
          <Input name="name" placeholder="Nome" />
          <Input name="email" type="email" placeholder="E-mail" />

          <hr />

          <Input
            name="oldPassword"
            type="password"
            placeholder="Senha antiga"
          />
          <Input name="password" type="password" placeholder="Nova senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar Senha"
          />

          <button type="submit">
            {loading ? 'Carregando...' : 'Atualizar Dados'}
          </button>
        </Form>
        <button
          type="button"
          onClick={() => dispatch(userDelete({ id: profile.id }))}>
          Deletar conta
        </button>
      </Content>
    </Container>
  )
}

export default Settings
