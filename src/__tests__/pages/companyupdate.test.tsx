import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import CompanyUpdate from '../../pages/company/update'

jest.mock('react-redux')

describe('CompanyUpdate', () => {
  it('should be able to render', () => {
    expect(
      render(
        <CompanyUpdate
          close={() => jest.fn()}
          initData={{
            id: 1,
            name: 'company',
            cnpj: '000-000-000/0000-0',
          }}
        />
      )
    ).toBeTruthy()
  })

  it('should be able update company data', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(
      <CompanyUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'company',
          cnpj: '00-000-000/0000-0',
        }}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'newName' },
    })
    fireEvent.change(screen.getByPlaceholderText('99.999.999/9999-99'), {
      target: { value: '00-000-000/0000-0' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Empresa' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('should not dispatch the action if any field has been passed wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(
      <CompanyUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'company',
          cnpj: '00-000-000/0000-0',
        }}
      />
    )
    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByPlaceholderText('99.999.999/9999-99'), {
      target: { value: '00-000-000/0000-0' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Empresa' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('display "carregando..." if the user has been clicked on the submit button', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        company: {
          loading: true,
        },
      })
    )

    render(
      <CompanyUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'company',
          cnpj: '000-000-000/0000-0',
        }}
      />
    )

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
