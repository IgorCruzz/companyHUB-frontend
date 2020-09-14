import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import Product from '../../pages/product/create'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    useParams: () => {
      return {
        company: 'COMPANY',
      }
    },
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Product', () => {
  it('should be able to render', () => {
    expect(render(<Product />)).toBeTruthy()
  })

  it('should be able to create a product', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Product />)

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: 'product' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar Produto!' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('should not dispatch the action if any field has been passed wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Product />)

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar Produto!' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('display "carregando.." if the user has been clicked on the submit button', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        product: {
          loading: true,
        },
      })
    )

    render(<Product />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
