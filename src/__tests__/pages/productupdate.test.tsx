import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import ProductUpdate from '../../pages/product/update'

jest.mock('react-redux')

jest.mock('react-router-dom', () => {
  return {
    useParams: () => {
      return {
        company: 'COMPANY',
      }
    },
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Service', () => {
  it('should be able to render', () => {
    expect(
      render(
        <ProductUpdate
          close={() => jest.fn()}
          initData={{
            id: 1,
            name: 'product',
            company_id: 1,
          }}
        />
      )
    ).toBeTruthy()
  })

  it('should be able to update a product data', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(
      <ProductUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'product',
          company_id: 1,
        }}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'product' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Produto' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('should not dispatch the action if any field has been passed wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(
      <ProductUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'product',
          company_id: 1,
        }}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Produto' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('display "carregando.." if the user has been clicked on the submit button', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        product: {
          loading: true,
        },
      })
    )

    render(
      <ProductUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'product',
          company_id: 1,
        }}
      />
    )

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
