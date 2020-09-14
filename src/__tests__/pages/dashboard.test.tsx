import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import Dashboard from '../../pages/dashboard'
import MockAdapter from 'axios-mock-adapter'
import { api } from '../../services/api'
jest.mock('react-redux')

const apiMock = new MockAdapter(api)

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Dashboard', () => {
  it('should be able to render', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          profile: {
            id: 1,
            name: 'name',
            email: 'user@gmail.com',
            administrator: true,
          },
        },
      })
    )

    expect(render(<Dashboard />)).toBeTruthy()
  })

  it('should be able to show panel button if the user is an admin', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          profile: {
            id: 1,
            name: 'name',
            email: 'user@gmail.com',
            administrator: true,
          },
        },
      })
    )

    apiMock.onGet('/companies/1').reply(200, {
      id: 1,
      name: 'company',
      cnpj: '000000000000',
      user_id: 1,
      productConnection: [],
    })

    render(<Dashboard />)

    await screen.findByText('Painel Administrativo')

    expect(screen.getByText('Painel Administrativo')).toBeInTheDocument()
  })

  describe('CompanyDelete', () => {
    it('should be able to open companyDelele modal', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [],
      })

      render(<Dashboard />)

      await screen.findByRole('companyDelete')

      fireEvent.click(screen.getByRole('companyDelete'))

      expect(screen.queryByRole('dialog')).toBeInTheDocument()
    })

    it('should be able to close companyDelele modal', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [],
      })

      render(<Dashboard />)

      await screen.findByRole('companyDelete')

      fireEvent.click(screen.getByRole('companyDelete'))

      fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
  describe('ProductDelete', () => {
    it('should be able to open productDelele modal and delete the product', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [
          {
            id: 1,
            name: 'product',
            company_id: 1,
          },
        ],
      })

      apiMock.onGet('/products/1').reply(200, [
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [],
        },
      ])

      render(<Dashboard />)

      await screen.findByRole('productDelete')

      fireEvent.click(screen.getByRole('productDelete'))

      expect(screen.queryByRole('dialog')).toBeInTheDocument()
    })

    it('should be able to open companyDelele modal and close it', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [
          {
            id: 1,
            name: 'product',
            company_id: 1,
          },
        ],
      })

      apiMock.onGet('/products/1').reply(200, [
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [],
        },
      ])

      render(<Dashboard />)

      await screen.findByRole('productDelete')

      fireEvent.click(screen.getByRole('productDelete'))
      fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
  describe('serviceDelete', () => {
    it('should be able to open serviceDelele modal', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [
          {
            id: 1,
            name: 'product',
            company_id: 1,
          },
        ],
      })

      apiMock.onGet('/products/1').reply(200, [
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [
            {
              id: 1,
              name: 'service',
              description: 'description',
              product_id: 1,
            },
          ],
        },
      ])

      render(<Dashboard />)

      await screen.findByRole('serviceDelete')

      fireEvent.click(screen.getByRole('serviceDelete'))

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should be able to close serviceDelele modal ', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [
          {
            id: 1,
            name: 'product',
            company_id: 1,
          },
        ],
      })

      apiMock.onGet('/products/1').reply(200, [
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [
            {
              id: 1,
              name: 'service',
              description: 'description',
              product_id: 1,
            },
          ],
        },
      ])

      render(<Dashboard />)

      await screen.findByRole('serviceDelete')

      fireEvent.click(screen.getByRole('serviceDelete'))
      fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    })
  })

  describe('CompanyUpdate', () => {
    it('should be able to open companyUpdate', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
          company: {
            loading: false,
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [],
      })

      render(<Dashboard />)

      await screen.findByRole('CompanyUpdate')

      fireEvent.click(screen.getByRole('CompanyUpdate'))

      expect(screen.queryByRole('modal')).toBeInTheDocument()
    })

    it('should be able to close companyUpdate', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
          company: {
            loading: false,
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [],
      })

      render(<Dashboard />)

      await screen.findByRole('CompanyUpdate')

      fireEvent.click(screen.getByRole('CompanyUpdate'))

      fireEvent.click(screen.getByRole('close'))

      expect(screen.queryByRole('modal')).not.toBeInTheDocument()
    })
  })
  describe('ProductUpdate', () => {
    it('should be able to open ProductUpdate', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
          product: {
            loading: false,
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [
          {
            id: 1,
            name: 'product',
            company_id: 1,
          },
        ],
      })

      apiMock.onGet('/products/1').reply(200, [
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [],
        },
      ])
      render(<Dashboard />)

      await screen.findByRole('ProductUpdate')

      fireEvent.click(screen.getByRole('ProductUpdate'))

      expect(screen.queryByRole('modal')).toBeInTheDocument()
    })

    it('should be able to close ProductUpdate', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
          product: {
            loading: false,
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [
          {
            id: 1,
            name: 'product',
            company_id: 1,
          },
        ],
      })

      apiMock.onGet('/products/1').reply(200, [
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [],
        },
      ])
      render(<Dashboard />)

      await screen.findByRole('ProductUpdate')

      fireEvent.click(screen.getByRole('ProductUpdate'))

      fireEvent.click(screen.getByRole('close'))

      expect(screen.queryByRole('modal')).not.toBeInTheDocument()
    })
  })
  describe('ServiceUpdate', () => {
    it('should be able to open ServiceUpdate', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
          service: {
            loading: false,
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [
          {
            id: 1,
            name: 'product',
            company_id: 1,
          },
        ],
      })

      apiMock.onGet('/products/1').reply(200, [
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [
            {
              id: 1,
              name: 'service',
              description: 'description',
              product_id: 1,
            },
          ],
        },
      ])
      render(<Dashboard />)

      await screen.findByRole('ServiceUpdate')

      fireEvent.click(screen.getByRole('ServiceUpdate'))

      expect(screen.queryByRole('modal')).toBeInTheDocument()
    })

    it('should be able to close ServiceUpdate', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
        cb({
          user: {
            profile: {
              id: 1,
              name: 'name',
              email: 'user@gmail.com',
              administrator: false,
            },
          },
          service: {
            loading: false,
          },
        })
      )

      apiMock.onGet('/companies/1').reply(200, {
        id: 1,
        name: 'company',
        cnpj: '000000000000',
        user_id: 1,
        productConnection: [
          {
            id: 1,
            name: 'product',
            company_id: 1,
          },
        ],
      })

      apiMock.onGet('/products/1').reply(200, [
        {
          id: 1,
          name: 'product',
          company_id: 1,
          serviceConnection: [
            {
              id: 1,
              name: 'service',
              description: 'description',
              product_id: 1,
            },
          ],
        },
      ])
      render(<Dashboard />)

      await screen.findByRole('ServiceUpdate')

      fireEvent.click(screen.getByRole('ServiceUpdate'))

      fireEvent.click(screen.getByRole('close'))

      expect(screen.queryByRole('modal')).not.toBeInTheDocument()
    })
  })
})
