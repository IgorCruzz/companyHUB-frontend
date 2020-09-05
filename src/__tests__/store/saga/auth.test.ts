import 'babel-polyfill'
import MockAdapter from 'axios-mock-adapter'
import { runSaga } from 'redux-saga'
import { authSuccess } from '../../../store/ducks/repositories/auth/actions'
import { authCreate } from '../../../store/ducks/repositories/auth/sagas'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const apiMock = new MockAdapter(api)

describe('Auth', () => {
  it('authCreate', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPut('auth/TOKEN').reply(201)

    global.window = Object.create(window)
    const url = 'http://localhost/'
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
      writable: true,
    })

    await runSaga({ dispatch }, authCreate, {
      payload: { data: { token: 'TOKEN' } },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(authSuccess())
    expect(toastMock).toHaveBeenCalledWith('Conta ativada com sucesso!!!')
  })

  it('authCreate / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPut('auth/TOKEN').reply(400, { error: 'error message' })

      global.window = Object.create(window)
      const url = 'http://localhost'
      Object.defineProperty(window, 'location', {
        value: {
          href: url,
        },
        writable: true,
      })

      await runSaga({ dispatch }, authCreate, {
        payload: { data: { token: 'TOKEN' } },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })
})
