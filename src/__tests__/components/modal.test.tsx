import 'jest-extended'
import 'babel-polyfill'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import { Modal } from '../../components/modal'

describe('Modal', () => {
  it('should be able to render', () => {
    expect(
      render(
        <Modal open={true} close={() => jest.fn()}>
          <strong>children</strong>
        </Modal>
      )
    ).toBeTruthy()
  })
})
