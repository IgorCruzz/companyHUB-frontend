import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import InputMask from 'react-input-mask'
import { Content, Error } from './styles'
import { FiAlertTriangle } from 'react-icons/fi'

interface Props {
  name: string
  children?: React.ReactNode
  stateName?: any
}
type InputProps = JSX.IntrinsicElements['input'] & Props

export const Input: React.FC<InputProps> = ({ name, ...rest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    })
  }, [fieldName, registerField])
  return (
    <Content>
      <input
        id={error ? 'error' : fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && (
        <Error data-testid="error">
          <FiAlertTriangle />
          {error}
        </Error>
      )}
    </Content>
  )
}

export const TextArea: React.FC<InputProps> = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    })
  }, [fieldName, registerField])
  return (
    <Content>
      <textarea
        id={error ? 'error' : fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <Error data-testid="error">{error}</Error>}
    </Content>
  )
}

export const CnpjInput: React.FC<InputProps> = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Content>
      <InputMask
        {...rest}
        id={error ? 'error' : fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        mask="99.999.999/9999-99"
        maskChar=" "
      />
      {error && <Error data-testid="error">{error}</Error>}
    </Content>
  )
}
