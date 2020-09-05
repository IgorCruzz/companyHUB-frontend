import 'jest-extended'
import 'babel-polyfill'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import { Header } from '../../components/header'

jest.mock('react-redux')

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

    expect(
      render(
        <Router>
          <Header />
        </Router>
      )
    ).toBeTruthy()
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
    render(
      <Router>
        <Header />
      </Router>
    )

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
    render(
      <Router>
        <Header />
      </Router>
    )

    userEvent.click(screen.getByTestId('logout'))

    expect(dispatch).toHaveBeenCalledWith({ type: '@signin/SIGN_OUT' })
  })
})
