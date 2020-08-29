import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`
export const Content = styled.div`
  width: 500px;

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
    background: #8b0000;

    &:hover {
      background: ${darken(0.1, '#8B0000')};
    }
  }

  form {
    width: 100%;

    input {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 25px;
      border: 0;
      margin: 10px 0;
      padding-left: 15px;
      height: 50px;
      color: #ffffffff;

      :focus {
        border: #3f3071 3px solid;
      }

      &::placeholder {
        font-weight: bold;
      }
    }

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
  }
`
