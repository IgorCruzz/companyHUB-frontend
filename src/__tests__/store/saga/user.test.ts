import 'babel-polyfill'
import MockAdapter from 'axios-mock-adapter'
import { runSaga } from 'redux-saga'
import {
  userCreateSuccess,
  userUpdateSuccess,
  userCreateFailure,
  userUpdateFailure,
} from '../../../store/ducks/repositories/user/actions'
import {
  createUser,
  deleteUser,
  updateUser,
} from '../../../store/ducks/repositories/user/sagas'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const apiMock = new MockAdapter(api)

describe('User', () => {
  it('createUser', async () => {
    const dispatch = jest.fn()

    global.window = Object.create(window)
    const url = 'http://localhost'
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
      writable: true,
    })

    apiMock.onPost('users').reply(201)

    await runSaga({ dispatch }, createUser, {
      payload: {
        data: {
          name: 'username',
          email: 'user@email.com',
          password: 'password',
          confirmPassword: 'password',
        },
      },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(userCreateSuccess())
  })

  it('createUser / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPost('users').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, createUser, {
        payload: {
          data: {
            name: 'username',
            email: 'user@email.com',
            password: 'password',
            confirmPassword: 'password',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(userCreateFailure).toHaveBeenCalled()
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('deleteUser', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPost('users').reply(201)

    apiMock.onDelete('users/1').reply(201)

    await runSaga({ dispatch }, deleteUser, {
      payload: {
        data: {
          id: 1,
        },
      },
    }).toPromise()

    expect(toastMock).toHaveBeenCalledWith('Conta deletada com sucesso!!!')
  })

  it('deleteUser / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onDelete('users/1').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, deleteUser, {
        payload: {
          data: {
            id: 1,
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('updateUser', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPut('users/1').reply(201)

    await runSaga({ dispatch }, updateUser, {
      payload: {
        data: {
          id: 1,
          name: 'username',
          email: 'user@email.com',
          password: 'password',
        },
      },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(userUpdateSuccess())
    expect(toastMock).toHaveBeenCalledWith(
      'Reloge no site para atualizar as informações'
    )
  })

  it('updateUser / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPut('users/1').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, updateUser, {
        payload: {
          data: {
            id: 1,
            name: 'username',
            email: 'user@email.com',
            password: 'password',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(userUpdateFailure).toHaveBeenCalled()
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })
})
