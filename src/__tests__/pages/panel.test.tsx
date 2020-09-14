import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import React from 'react'
import Panel from '../../pages/panel'
import MockAdapter from 'axios-mock-adapter'
import { api } from '../../services/api'

const apiMock = new MockAdapter(api)

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Panel', () => {
  it('should be able to render', async () => {
    apiMock.onGet('companies').reply(200, [
      {
        cnpj: '000000000000',
        id: 1,
        name: 'company',
        productConnection: [
          {
            company_id: 1,

            id: 1,
            name: 'product',
          },
        ],
        user_id: 20,
      },
    ])

    apiMock.onGet('products').reply(200, [
      {
        companyConnection: {
          cnpj: '000000000000',
          id: 1,
          name: 'company',
          user_id: 20,
        },
        company_id: 1,
        id: 1,
        name: 'product',
        serviceConnection: [
          {
            description: 'description',
            id: 18,
            name: 'service',
            product_id: 1,
          },
        ],
      },
    ])

    render(<Panel />)

    await screen.findByTestId('company')

    expect(screen.getByTestId('company')).toBeInTheDocument()
  })

  it('show an message if the product has no one services registered', async () => {
    apiMock.onGet('companies').reply(200, [
      {
        cnpj: '000000000000',
        id: 1,
        name: 'company',
        productConnection: [
          {
            company_id: 1,

            id: 1,
            name: 'product',
          },
        ],
        user_id: 20,
      },
    ])

    apiMock.onGet('products').reply(200, [
      {
        companyConnection: {
          cnpj: '000000000000',
          id: 1,
          name: 'company',
          user_id: 20,
        },
        company_id: 1,
        id: 1,
        name: 'product',
        serviceConnection: [],
      },
    ])

    render(<Panel />)

    await waitFor(() => {
      expect(screen.getByTestId('paragph')).toBeInTheDocument()
    })
  })
})
