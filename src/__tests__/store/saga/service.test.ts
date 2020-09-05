import 'babel-polyfill'
import MockAdapter from 'axios-mock-adapter'
import { runSaga } from 'redux-saga'
import {
  serviceRegisterSuccess,
  serviceUpdateSuccess,
} from '../../../store/ducks/repositories/service/actions'
import {
  createService,
  deleteService,
  updateService,
} from '../../../store/ducks/repositories/service/sagas'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const apiMock = new MockAdapter(api)

describe('Service', () => {
  it('createService', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPost('services').reply(201)

    await runSaga({ dispatch }, createService, {
      payload: {
        data: {
          name: 'service',
          description: 'description',
        },
      },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(serviceRegisterSuccess())
    expect(toastMock).toHaveBeenCalledWith('Serviço criado com sucesso!!!')
  })

  it('createService / thow an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPost('services').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, createService, {
        payload: {
          data: {
            name: 'service',
            description: 'description',
          },
        },
      }).toPromise()
    } catch (err) {
      const tostMock = jest.spyOn(toast, 'error')
      expect(tostMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('deleteService', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onDelete('services/1').reply(200)

    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    })

    await runSaga({ dispatch }, deleteService, {
      payload: {
        data: {
          product_id: 1,
          id: 1,
        },
      },
    }).toPromise()

    expect(toastMock).toHaveBeenCalledWith('Serviço excluído com sucesso')
  })

  it('deleteService / thow an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onDelete('services/1').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, deleteService, {
        payload: { data: { id: 1, product_id: 1 } },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.fn()
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('updateService', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPut('services/1').reply(200)

    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    })

    await runSaga({ dispatch }, updateService, {
      payload: {
        data: {
          id: 1,
          name: 'service',
          description: 'description',
          product_id: 1,
        },
      },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(serviceUpdateSuccess())
    expect(toastMock).toHaveBeenCalledWith('Serviço atualizado com sucesso!!!')
  })

  it('updateService / thow an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock
        .onPut('services/1')
        .reply(400, { data: { error: 'error message' } })

      await runSaga({ dispatch }, updateService, {
        payload: {
          data: {
            id: 1,
            product_id: 1,
            name: 'service',
          },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.fn()
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })
})
