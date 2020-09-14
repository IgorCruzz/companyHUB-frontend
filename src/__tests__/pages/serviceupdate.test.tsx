import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import ServiceUpdate from '../../pages/service/update'

jest.mock('react-redux')

describe('ServiceUpdate', () => {
  it('should be able to render', () => {
    expect(
      render(
        <ServiceUpdate
          close={() => jest.fn()}
          initData={{
            id: 1,
            name: 'service',
            description: 'description',
            product_id: 1,
          }}
        />
      )
    ).toBeTruthy()
  })

  it('should be able to update a service data', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(
      <ServiceUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'service',
          description: 'description',
          product_id: 1,
        }}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'service' },
    })

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'Descrição do serviço' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Serviço' }))

    await waitFor(() => {
      expect(dispatch).toBeCalled()
    })
  })

  it('dont dispatch the action if any field has been passed wrong', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(
      <ServiceUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'service',
          description: 'description',
          product_id: 1,
        }}
      />
    )

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: '' },
    })

    fireEvent.input(screen.getByPlaceholderText('Nome'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Atualizar Serviço' }))

    await waitFor(() => {
      expect(dispatch).not.toBeCalled()
    })
  })

  it('display "carregando.." if the user has been clicked on the submit button', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation((cb) =>
      cb({
        service: {
          loading: true,
        },
      })
    )

    render(
      <ServiceUpdate
        close={() => jest.fn()}
        initData={{
          id: 1,
          name: 'service',
          description: 'description',
          product_id: 1,
        }}
      />
    )

    expect(
      screen.getByRole('button', { name: 'Carregando...' })
    ).toBeInTheDocument()
  })
})
