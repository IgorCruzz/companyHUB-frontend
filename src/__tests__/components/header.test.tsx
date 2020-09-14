import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import { Header } from '../../components/header'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Header', () => {
  it('should be able to render', () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          loading: false,
          profile: {
            id: 1,
            name: 'username',
            administrator: false,
            email: 'username@email.com',
          },
        },
      })
    )

    expect(render(<Header />)).toBeTruthy()
  })

  it('display administrator panel if user is an admin', () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          loading: false,
          profile: {
            id: 1,
            name: 'username',
            administrator: true,
            email: 'username@email.com',
          },
        },
      })
    )
    render(<Header />)

    expect(screen.getByTestId('panel')).toBeTruthy()
  })

  it('should be able to logout', () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        user: {
          loading: false,
          profile: {
            id: 1,
            name: 'username',
            administrator: true,
            email: 'username@email.com',
          },
        },
      })
    )
    render(<Header />)

    fireEvent.click(screen.getByTestId('logout'))

    expect(dispatch).toHaveBeenCalledWith({ type: '@signin/SIGN_OUT' })
  })
})
