import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Container, Content, Title } from './styles'
import { Input } from '../../../components/input'
import * as Yup from 'yup'
import { productRegisterRequest } from '../../../store/ducks/repositories/product/actions'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {
  ICreateProduct,
  IProductState,
} from '../../../store/ducks/repositories/product/types'
import { Validator } from '../../../utils/ValidationError'

interface Errors {
  [key: string]: string
}

const Product: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const loading = useSelector((state: IProductState) => state.product.loading)
  const dispatch = useDispatch()
  const params: { company: string } = useParams()

  const handleSubmit = async (data: ICreateProduct) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().min(5).max(50).required(),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(
        productRegisterRequest({
          name: data.name,
          company_id: Number(params.company),
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
          <h1>Cadastrar Produto</h1>
          <Link to="/dashboard">
            <AiOutlineArrowLeft /> Voltar para Dashboard
          </Link>
        </Title>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="name" placeholder="Nome" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Cadastrar Produto!'}
          </button>
        </Form>
      </Content>
    </Container>
  )
}
export default Product
