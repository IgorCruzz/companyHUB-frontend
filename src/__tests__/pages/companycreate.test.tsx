import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import Company from '../../pages/company/create'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Company', () => {
  it('should be able to render', () => {
    expect(render(<Company />)).toBeTruthy()
  })

  it('should be able to create a new company', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Company />)

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: 'company' },
    })
    fireEvent.change(screen.getByPlaceholderText('99.999.999/9999-99'), {
      target: { value: '99.999.999/9999-99' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar Empresa!' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch the action if any field has been passed wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Company />)

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: 'name' },
    })
    fireEvent.change(screen.getByPlaceholderText('99.999.999/9999-99'), {
      target: { value: '99.999.999/9999-99' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar Empresa!' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('display "carregando.." if the user has been clicked on the submit button', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        company: {
          loading: true,
        },
      })
    )

    render(<Company />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
