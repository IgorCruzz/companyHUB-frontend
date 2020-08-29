import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    margin-top: 20px;
    height: 50px;
    width: 100%;
    border-radius: 25px;
    border: 0;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    background: #3f3071;

    &:hover {
      background: ${darken(0.1, '#3F3071')};
    }
  }
`
