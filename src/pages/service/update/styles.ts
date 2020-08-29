import styled from 'styled-components'
import { darken } from 'polished'

export const Content = styled.div`
  margin: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  h1 {
    margin: 20px 0;
    font-size: 50px;
  }

  form {
    width: 100%;

    textarea {
      padding: 10px;
      border-radius: 25px;
      border: 0;
      height: 200px;
      margin: 5px;
      padding-left: 15px;
      border: #3f3071 3px solid;
    }

    input {
      border-radius: 25px;
      border: 0;
      margin: 5px;
      padding-left: 15px;
      height: 50px;
      border: #3f3071 3px solid;
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
