import 'babel-polyfill'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import * as redux from 'react-redux'
import React from 'react'
import Dialog from '../../components/dialog'
import { companyDelete } from '../../store/ducks/repositories/company/actions'

jest.mock('react-redux')

describe('Dialog', () => {
  it('should be able to render', () => {
    const data = {
      company_id: 1,
      id: 1,
    }
    const dispatch = jest.fn()
    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    expect(
      render(
        <Dialog close={() => jest.fn()} data={data} action={companyDelete} />
      )
    ).toBeTruthy()
  })

  it('should be able to delete an company', () => {
    const data = {
      company_id: 1,
      id: 1,
    }
    const dispatch = jest.fn()
    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(
      <Dialog close={() => jest.fn()} data={data} action={companyDelete} />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Deletar' }))

    expect(dispatch).toBeCalled()
  })

  it('should be able to close the dialog', () => {
    const data = {
      company_id: 1,
      id: 1,
    }
    const dispatch = jest.fn()
    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    render(
      <Dialog close={() => jest.fn()} data={data} action={companyDelete} />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
  })
})
