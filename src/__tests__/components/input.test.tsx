import 'jest-extended'
import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Input, CnpjInput, TextArea } from '../../components/input'
import * as unform from '@unform/core'

describe('Inputs', () => {
  describe('Input', () => {
    it('should be render', () => {
      jest.spyOn(unform, 'useField').mockReturnValue({
        fieldName: 'name',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
        clearError: jest.fn(),
      })

      render(<Input name="name" placeholder="name" />)

      expect(screen.getByPlaceholderText('name')).toBeTruthy()
    })

    it('change input border color if has received an error', async () => {
      jest.spyOn(unform, 'useField').mockReturnValue({
        fieldName: 'name',
        defaultValue: '',
        error: 'error message',
        registerField: jest.fn(),
        clearError: jest.fn(),
      })

      render(<Input name="name" placeholder="name" />)

      await screen.findByTestId('error')

      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
  })

  describe('CnpjInput', () => {
    it('should be render', () => {
      render(<CnpjInput name="cnpj" placeholder="00.000.000/0000-0" />)

      expect(screen.getByPlaceholderText('00.000.000/0000-0')).toBeTruthy()
    })

    it('change input border color if has received an error', async () => {
      jest.spyOn(unform, 'useField').mockReturnValue({
        fieldName: 'cnpj',
        defaultValue: '',
        error: 'error message',
        registerField: jest.fn(),
        clearError: jest.fn(),
      })

      render(<CnpjInput name="cnpj" placeholder="00.000.000/0000-0" />)

      await screen.findByTestId('error')

      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
  })

  describe('TextArea', () => {
    it('should be render', () => {
      render(<TextArea name="textarea" placeholder="Insira seu texto" />)

      expect(screen.getByPlaceholderText('Insira seu texto')).toBeTruthy()
    })

    it('change input border color if has received an error', async () => {
      jest.spyOn(unform, 'useField').mockReturnValue({
        fieldName: 'textarea',
        defaultValue: '',
        error: 'error message',
        registerField: jest.fn(),
        clearError: jest.fn(),
      })

      render(<TextArea name="textarea" placeholder="Insira seu texto" />)

      await screen.findByTestId('error')

      expect(screen.getByTestId('error')).toBeInTheDocument()
    })
  })
})
