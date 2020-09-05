import 'babel-polyfill'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as redux from 'react-redux'
import React from 'react'
import { Dialog } from '../../components/dialog'
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
        <Dialog
          open={true}
          close={() => jest.fn()}
          data={data}
          action={companyDelete}
        />
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
      <Dialog
        open={true}
        close={() => jest.fn()}
        data={data}
        action={companyDelete}
      />
    )

    userEvent.click(screen.getByTestId('delete'))

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        data: {
          company_id: 1,
          id: 1,
        },
      },
      type: '@company/COMPANY_DELETE',
    })
  })
})
