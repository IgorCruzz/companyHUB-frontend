import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Container, Content, Title } from './styles'
import { Input, CnpjInput } from '../../../components/input'
import * as Yup from 'yup'
import { companyRegisterRequest } from '../../../store/ducks/repositories/company/actions'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {
  ICreateCompany,
  ICompanyState,
} from '../../../store/ducks/repositories/company/types'
import { Validator } from '../../../utils/ValidationError'

interface Errors {
  [key: string]: string
}

const Company: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector((state: ICompanyState) => state.company.loading)
  const dispatch = useDispatch()

  const handleSubmit = async (data: ICreateCompany) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(5, 'O campo precisa ter no mínimo 5 caracteres')
          .max(100, 'O campo precisa ter no máximo 100 caracteres')
          .required('Campo obrigatório'),
        cnpj: Yup.string().required(),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(companyRegisterRequest(data))
    } catch (err) {
      const Error = Validator(err)

      formRef.current?.setErrors(Error)
    }
  }

  return (
    <Container>
      <Content>
        <Title>
          <h1>Cadastrar Empresa</h1>
          <Link to="/dashboard">
            <AiOutlineArrowLeft /> Voltar para Dashboard
          </Link>
        </Title>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="name" placeholder="Nome" />
          <CnpjInput name="cnpj" placeholder="99.999.999/9999-99" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Cadastrar Empresa!'}
          </button>
        </Form>
      </Content>
    </Container>
  )
}
export default Company
