import 'jest-extended'
import 'babel-polyfill'
import '@testing-library/jest-dom'
import { Form } from '@unform/web'
import { render } from '@testing-library/react'
import React from 'react'
import { Input, CnpjInput, TextArea } from '../../components/input'

jest.mock('react-redux')

describe('Inputs', () => {
  it('Input', () => {
    expect(
      render(
        <Form onSubmit={() => jest.fn()}>
          <Input name="name" />
        </Form>
      )
    ).toBeTruthy()
  })

  it('CnpjInput', () => {
    expect(
      render(
        <Form onSubmit={() => jest.fn()}>
          <CnpjInput name="cnpj" />
        </Form>
      )
    ).toBeTruthy()
  })

  it('TextArea', () => {
    expect(
      render(
        <Form onSubmit={() => jest.fn()}>
          <TextArea name="cnpj" />
        </Form>
      )
    ).toBeTruthy()
  })
})
