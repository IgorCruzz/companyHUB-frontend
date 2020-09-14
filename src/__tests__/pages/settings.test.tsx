import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import Settings from '../../pages/settings'

jest.mock('react-redux')

describe('Settings', () => {
  it('should be able to render', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          profile: {
            id: 1,
            name: 'username',
            email: 'user@gmail.com',
            administrator: true,
          },
          loading: false,
        },
      })
    )

    expect(render(<Settings />)).toBeTruthy()
  })

  it('should be able to change password', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          profile: {
            id: 1,
            name: 'username',
            email: 'user@gmail.com',
            administrator: true,
          },
          loading: false,
        },
      })
    )

    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Settings />)

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'username' },
    })
    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'user@email.com' },
    })

    fireEvent.change(screen.getByPlaceholderText('Senha antiga'), {
      target: { value: 'password' },
    })
    fireEvent.change(screen.getByPlaceholderText('Nova senha'), {
      target: { value: 'newPassword' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirmar Senha'), {
      target: { value: 'newPassword' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Dados' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('should be able to change data', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          profile: {
            id: 1,
            name: 'username',
            email: 'user@gmail.com',
            administrator: true,
          },
          loading: false,
        },
      })
    )

    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Settings />)

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'username' },
    })
    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: 'user@email.com' },
    })

    fireEvent.change(screen.getByPlaceholderText('Senha antiga'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByPlaceholderText('Nova senha'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirmar Senha'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Dados' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch the action if any field has been passed wrong', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          profile: {
            id: 1,
            name: 'username',
            email: 'user@gmail.com',
            administrator: true,
          },
          loading: false,
        },
      })
    )

    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Settings />)

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByPlaceholderText('E-mail'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByPlaceholderText('Senha antiga'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByPlaceholderText('Nova senha'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByPlaceholderText('Confirmar Senha'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Dados' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('display "carregando.." if the user has been clicked on the submit button', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          profile: {
            id: 1,
            name: 'username',
            email: 'user@gmail.com',
            administrator: true,
          },
          loading: true,
        },
      })
    )

    render(<Settings />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })

  it('should be able to delete user', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          profile: {
            id: 1,
            name: 'username',
            email: 'user@gmail.com',
            administrator: true,
          },
          loading: false,
        },
      })
    )

    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Settings />)

    fireEvent.click(screen.getByRole('button', { name: 'Deletar conta' }))

    expect(dispatch).toBeCalled()
  })
})
