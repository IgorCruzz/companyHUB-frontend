import 'babel-polyfill'
import MockAdapter from 'axios-mock-adapter'
import { runSaga } from 'redux-saga'
import {
  productRegisterSuccess,
  productUpdateSuccess,
} from '../../../store/ducks/repositories/product/actions'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../../store/ducks/repositories/product/sagas'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const apiMock = new MockAdapter(api)

describe('Product', () => {
  it('createProduct', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPost('products').reply(201)

    await runSaga({ dispatch }, createProduct, {
      payload: { data: { name: 'product', company_id: 1 } },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(productRegisterSuccess())
    expect(toastMock).toHaveBeenCalledWith('Produto criado com sucesso!!!')
  })

  it('createProduct / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()
      apiMock.onPost('products').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, createProduct, {
        payload: { data: { name: 'product', company_id: 1 } },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('deleteProduct', async () => {
    const dispatch = jest.fn()

    apiMock.onDelete('products/1').reply(200)

    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    })

    await runSaga({ dispatch }, deleteProduct, {
      payload: {
        data: {
          id: 1,
          company_id: 1,
        },
      },
    }).toPromise()
  })

  it('deleteProduct / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onDelete('products/1').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, deleteProduct, {
        payload: { data: { id: 1, company_id: 1 } },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })

  it('updateProduct', async () => {
    const dispatch = jest.fn()
    const toastMock = jest.spyOn(toast, 'success')

    apiMock.onPut('products/1').reply(201)

    await runSaga({ dispatch }, updateProduct, {
      payload: { data: { id: 1, name: 'product', company_id: 1 } },
    }).toPromise()

    expect(dispatch).toHaveBeenCalledWith(productUpdateSuccess())
    expect(toastMock).toHaveBeenCalledWith('Produto atualizado com sucesso!!!')
  })

  it('updateProduct / throw an error if any has wrong', async () => {
    try {
      const dispatch = jest.fn()

      apiMock.onPut('products/1').reply(400, { error: 'error message' })

      await runSaga({ dispatch }, updateProduct, {
        payload: { data: { id: 1, name: 'product', company_id: 1 } },
      }).toPromise()
    } catch (err) {
      const toastMock = jest.spyOn(toast, 'error')
      expect(toastMock).toHaveBeenCalledWith(err.response.data.error)
    }
  })
})
