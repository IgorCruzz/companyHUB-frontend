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
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  display: flex;
  width: 80%;
  height: 50vh;
  justify-content: space-between;
  margin: 30px;

  form {
    @media (max-width: 1200px) {
      width: 100%;
    }

    width: 60%;

    textarea {
      border-radius: 25px;
      border: 0;
      margin: 5px;
      padding: 15px;
      height: 150px;

      :focus {
        border: #3f3071 3px solid;
      }
    }

    input {
      border-radius: 25px;
      border: 0;
      margin: 5px;
      padding-left: 15px;
      height: 50px;

      :focus {
        border: #3f3071 3px solid;
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
export const Title = styled.div`
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    margin-right: 0;
    margin-bottom: 20px;
  }

  margin-right: 50px;
  width: 80%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  h1 {
    @media (max-width: 1200px) {
      font-size: 4rem;
    }

    color: #ffffff;
    margin-bottom: 50px;
    text-align: center;
    font-size: 6rem;
  }

  a {
    text-decoration: none;
    color: #ffffff;

    display: flex;
    align-items: center;

    &:hover {
      color: #3f3071;
    }

    svg {
      margin-right: 10px;
    }
  }
`
