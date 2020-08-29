import React, { useRef, useEffect, useState } from 'react'
import { Modal } from '../../../components/modal'
import * as Yup from 'yup'
import { RouteComponentProps } from '@reach/router'
import {
  IUpdateCompany,
  ICompanyState,
} from '../../../store/ducks/repositories/company/types'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input, CnpjInput } from '../../../components/input'
import { companyUpdateRequest } from '../../../store/ducks/repositories/company/actions'

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
    cnpj: string
  }
}

export const CompanyUpdate: React.FC<Props> = ({ open, close, initData }) => {
  const formRef = useRef<FormHandles>(null)
  const dispatch = useDispatch()
  const loading = useSelector((state: ICompanyState) => state.company.loading)
  const [companyId, setCompanyId] = useState(0)

  useEffect(() => {
    setCompanyId(initData.id)
  }, [])

  const handleSubmit = async (data: IUpdateCompany) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().min(5).max(100),
        cnpj: Yup.string(),
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(
        companyUpdateRequest({
          id: companyId,
          name: data.name,
          cnpj: data.cnpj
            .split('.')
            .join('')
            .split('/')
            .join('')
            .split('-')
            .join(''),
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
        <h1>Empresa</h1>

        <Form onSubmit={handleSubmit} ref={formRef} initialData={initData}>
          <Input name="name" placeholder="Nome" />
          <CnpjInput name="cnpj" placeholder="99.999.999/9999-99" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Atualizar Empresa'}
          </button>
        </Form>
      </Content>
    </Modal>
  )
}
