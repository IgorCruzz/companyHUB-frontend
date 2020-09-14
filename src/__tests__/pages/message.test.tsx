import 'babel-polyfill'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import Message from '../../pages/message'

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Message', () => {
  it('should be able to render', () => {
    expect(render(<Message />)).toBeTruthy()
  })
})
