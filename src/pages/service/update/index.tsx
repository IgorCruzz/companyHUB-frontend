import React, { useRef, useEffect, useState } from 'react'
import { Modal } from '../../../components/modal'
import * as Yup from 'yup'
import { RouteComponentProps } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input, TextArea } from '../../../components/input'
import { serviceUpdateRequest } from '../../../store/ducks/repositories/service/actions'
import { Content } from './styles'
import {
  IUpdateService,
  IServiceState,
} from '../../../store/ducks/repositories/service/types'

interface Errors {
  [key: string]: string
}

interface Props extends RouteComponentProps {
  open?: boolean
  close?: () => void
  initData: {
    id: number
    name: string
    description: string
    product_id: number
  }
}

export const ServiceUpdate: React.FC<Props> = ({ open, close, initData }) => {
  const formRef = useRef<FormHandles>(null)
  const dispatch = useDispatch()
  const loading = useSelector((state: IServiceState) => state.service.loading)
  const [productId, setProductId] = useState(0)
  const [serviceId, setServiceId] = useState(0)

  useEffect(() => {
    setProductId(initData.product_id)
    setServiceId(initData.id)
  }, [])

  const handleSubmit = async (data: IUpdateService) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().min(5).max(50),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(
        serviceUpdateRequest({
          id: serviceId,
          name: data.name,
          description: data.description,
          product_id: productId,
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
        <h1>Serviço</h1>

        <Form onSubmit={handleSubmit} ref={formRef} initialData={initData}>
          <Input name="name" placeholder="Nome" />
          <TextArea name="description" placeholder="Descrição do serviço" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Atualizar Serviço'}
          </button>
        </Form>
      </Content>
    </Modal>
  )
}
