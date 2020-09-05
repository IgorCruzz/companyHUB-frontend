import 'babel-polyfill'
import MockAdapter from 'axios-mock-adapter'
import { runSaga } from 'redux-saga'
import {
  companyRegisterSuccess,
  companyUpdateSuccess,
} from '../../../store/ducks/repositories/company/actions'
import {
  createCompany,
  deleteCompany,
  updateCompany,
} from '../../../store/ducks/repositories/company/sagas'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const apiMock = new MockAdapter(api)

describe('Company', () => {
  it('createCompany', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPost('companies').reply(201)

    await runSaga({ dispatch }, createCompany, {
      payload: { data: { name: 'product', cnpj: '000.000.000/0000-1' } },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(companyRegisterSuccess())
    expect(toastMock).toHaveBeenCalledWith('Empresa cadastrada com sucesso!!!')
  })

  it('createCompany / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()
      apiMock.onPost('companies').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, createCompany, {
        payload: { data: { name: 'product', cnpj: '000.000.000/0000-1' } },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('deleteCompany', async () => {
    const dispatch = jest.fn()

    apiMock.onDelete('companies/1').reply(200)

    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    })

    await runSaga({ dispatch }, deleteCompany, {
      payload: {
        data: {
          id: 1,
        },
      },
    }).toPromise()
  })

  it('deleteCompany / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onDelete('companies/1').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, deleteCompany, {
        payload: { data: { id: 1 } },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('updateCompany', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPut('companies/1').reply(201)

    await runSaga({ dispatch }, updateCompany, {
      payload: { data: { name: 'product', cnpj: '000.000.000/0000-1', id: 1 } },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(companyUpdateSuccess())
    expect(toastMock).toHaveBeenCalledWith('Empresa atualizada com sucesso!!!')
  })

  it('updateProduct / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPut('companies/1').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, updateCompany, {
        payload: {
          data: { name: 'product', cnpj: '000.000.000/0000-1', id: 1 },
        },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })
})
