import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Container, Content, Title } from './styles'
import { Input, TextArea } from '../../../components/input'
import * as Yup from 'yup'
import { serviceRegisterRequest } from '../../../store/ducks/repositories/service/actions'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {
  ICreateService,
  IServiceState,
} from '../../../store/ducks/repositories/service/types'
import { Validator } from '../../../utils/ValidationError'

interface Errors {
  [key: string]: string
}

const Service: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector((state: IServiceState) => state.service.loading)
  const dispatch = useDispatch()
  const params: { product: string } = useParams()

  const handleSubmit = async (data: ICreateService) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(5, 'O campo precisa ter no mínimo 5 caracteres')
          .max(50, 'O campo precisa ter no máximo 50 caracteres')
          .required('Campo obrigatório'),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(
        serviceRegisterRequest({
          name: data.name,
          description: data.description,
          product_id: Number(params.product),
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
        <Title>
          <h1>Cadastrar Serviço</h1>
          <Link to="/dashboard">
            <AiOutlineArrowLeft /> Voltar para Dashboard
          </Link>
        </Title>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="name" placeholder="Nome" />
          <TextArea name="description" placeholder="Descrição do serviço" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Cadastrar Serviço!'}
          </button>
        </Form>
      </Content>
    </Container>
  )
}

export default Service
