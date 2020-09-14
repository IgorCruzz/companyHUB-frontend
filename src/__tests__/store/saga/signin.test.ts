import 'babel-polyfill'
import MockAdapter from 'axios-mock-adapter'
import { runSaga } from 'redux-saga'
import { signInSuccess } from '../../../store/ducks/repositories/signin/actions'
import {
  signIn,
  setToken,
} from '../../../store/ducks/repositories/signin/sagas'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const apiMock = new MockAdapter(api)

describe('SignIn', () => {
  it('signIn', async () => {
    const dispatch = jest.fn()

    apiMock.onPost('session').reply(201, {
      token: 'token',
      id: 1,
      name: 'username',
      email: 'user@gmail.com',
    })

    await runSaga({ dispatch }, signIn, {
      payload: {
        data: {
          email: 'user@gmail.com',
          password: 'password',
        },
      },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(
      signInSuccess('token', {
        id: 1,
        name: 'username',
        email: 'user@gmail.com',
      })
    )
  })

  it('signIn / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPost('session').reply(401, {
        error: 'error message',
      })

      await runSaga({ dispatch }, signIn, {
        payload: {
          data: {
            email: 'user@gmail.com',
            password: 'password',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')

      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('Token', () => {
    setToken({
      payload: {
        signIn: {
          token: 'TOKEN',
        },
      },
    })
  })

  it('return nothing if payload has not passed', () => {
    expect(setToken({})).toEqual(undefined)
  })

  it('return null if token has not passed', () => {
    expect(
      setToken({
        payload: {
          signIn: {},
        },
      })
    ).toEqual(undefined)
  })
})
