import React, { useRef, useEffect, useState } from 'react'
import { Modal } from '../../../components/modal'
import * as Yup from 'yup'
import { RouteComponentProps } from '@reach/router'
import {
  IUpdateProduct,
  IProductState,
} from '../../../store/ducks/repositories/product/types'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input } from '../../../components/input'
import { productUpdateRequest } from '../../../store/ducks/repositories/product/actions'

import { Content } from './styles'

interface Errors {
  [key: string]: string
}

interface Props extends RouteComponentProps {
  open?: boolean
  close?: () => void
  initData: {
    id: number
    name: string
    company_id: number
  }
}

export const ProductUpdate: React.FC<Props> = ({ open, close, initData }) => {
  const formRef = useRef<FormHandles>(null)
  const dispatch = useDispatch()
  const loading = useSelector((state: IProductState) => state.product.loading)
  const [productId, setProductId] = useState(0)
  const [companyId, setCompanyId] = useState(0)

  useEffect(() => {
    setProductId(initData.id)
    setCompanyId(initData.company_id)
  }, [])

  const handleSubmit = async (data: IUpdateProduct) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().min(5).max(50),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(
        productUpdateRequest({
          id: productId,
          name: data.name,
          company_id: companyId,
        })
      )
    } catch (err) {
      const validationErrors: Errors = {}

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message
        })
        formRef.current?.setErrors(validationErrors)
      }
    }
  }

  return (
    <Modal open={open} close={close}>
      <Content>
        <h1>Produto</h1>

        <Form onSubmit={handleSubmit} ref={formRef} initialData={initData}>
          <Input name="name" placeholder="Nome" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Atualizar Produto'}
          </button>
        </Form>
      </Content>
    </Modal>
  )
}
