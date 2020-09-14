import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import Service from '../../pages/service/create'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    useParams: () => {
      return {
        product: 'PRODUCT',
      }
    },
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Service', () => {
  it('should be able to render', () => {
    expect(render(<Service />)).toBeTruthy()
  })

  it('should be able to create a new service', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Service />)

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: 'service' },
    })

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: 'Descrição do serviço' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar Serviço!' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch the action if any field has been passed wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Service />)

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: '' },
    })

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar Serviço!' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('display "carregando.." if the user has been clicked on the submit button', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        service: {
          loading: true,
        },
      })
    )

    render(<Service />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
