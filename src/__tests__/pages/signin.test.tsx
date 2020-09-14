import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import Signin from '../../pages/signin'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Signin', () => {
  it('should be able to render', () => {
    expect(render(<Signin />)).toBeTruthy()
  })

  it('should be able to login', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Signin />)

    fireEvent.input(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'user@gmail.com' },
    })
    fireEvent.input(screen.getByPlaceholderText('Senha'), {
      target: { value: 'password' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch the action if any field has been passed wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Signin />)

    fireEvent.input(screen.getByPlaceholderText('E-mail'), {
      target: { value: '' },
    })
    fireEvent.input(screen.getByPlaceholderText('Senha'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('display "carregando.." if the user has been clicked on the submit button', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        signIn: {
          signed: false,
          loading: true,
        },
      })
    )

    render(<Signin />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
