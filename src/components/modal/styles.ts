import styled, { css } from 'styled-components'

interface Props {
  readonly active?: boolean
  readonly close?: boolean
}

export const Container = styled.div<Props>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  z-index: 3;
  align-items: center;
  justify-content: center;
  display: ${(props) => (props.close ? 'none' : 'flex')};
`

export const Content = styled.div`
  padding: 15px;
  width: 400px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  > button {
    background: transparent;
    border: 0;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    color: #777777;
  }
`
