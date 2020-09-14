import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import Authentication from '../../pages/authentication'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    useParams: () => {
      return {
        token: 'token',
      }
    },
  }
})

describe('Authentication', () => {
  it('should be able to render', () => {
    expect(render(<Authentication />)).toBeTruthy()
  })

  it('dispatch an action when the user click in the authentication button', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        auth: {
          loading: false,
        },
      })
    )
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)
    render(<Authentication />)

    fireEvent.click(screen.getByRole('button', { name: 'Ativar conta' }))

    expect(dispatch).toHaveBeenCalled()
  })

  it('display "carregando..." if the button has been clicked', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        auth: {
          loading: true,
        },
      })
    )
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(<Authentication />)

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
