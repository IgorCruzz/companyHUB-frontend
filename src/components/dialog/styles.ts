import styled, { css } from 'styled-components'
import { darken } from 'polished'

interface Props {
  readonly close?: boolean
}

export const Container = styled.div<Props>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  z-index: 2;
  align-items: center;
  justify-content: center;
  display: ${(props) => (props.close ? 'none' : 'flex')};
`

export const Content = styled.div`
  padding: 15px;
  width: 300px;
  background: #ffffff;
  border-radius: 10px;
  p {
    margin-bottom: 15px;
    text-align: center;
    font-weight: bold;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button#cancelar {
      background: transparent;
      color: #000000;
    }
    button {
      color: #ffffff;
      padding: 5px;
      margin-right: 10px;
      background: #b22222;
      border: 0;
      border-radius: 4px;

      &:hover {
        background: ${darken(0.2, '#B22222')};
      }
    }
  }
`
