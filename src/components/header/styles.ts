import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  width: 100%;
  background: #ffffffff;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  @media (max-width: 730px) {
    margin: 0;
  }
  width: 100%;
  max-width: 1400px;
  margin: 0 25px;
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: space-between;

  strong {
    @media (max-width: 750px) {
      display: none;
    }

    font-size: 2.5rem;
    color: #4b0082;
  }

  p {
    font-size: 2.5rem;
    color: #4b0082;
    font-weight: bold;
  }

  span {
    display: flex;
    align-items: center;
  }

  a {
    background: none;
    border: 0;
    margin: 0 15px;
    text-decoration: none;

    svg {
      height: 40px;
      width: 40px;
      color: #4b0082;

      &:hover {
        color: ${darken(0.1, '#4B0082')};
      }
    }
  }

  button {
    background: none;
    border: 0;
    margin: 0 15px;

    svg {
      height: 40px;
      width: 40px;
      color: #4b0082;

      &:hover {
        color: ${darken(0.1, '#4B0082')};
      }
    }
  }
`
export const PanelLink = styled.div`
  @media (max-width: 540px) {
    display: none;
  }

  margin: 0 15px;
  background: #7159c1;
  color: #ffffff;
  font-weight: bold;
  height: 100%;
  border-radius: 25px;

  &:hover {
    background: ${darken(0.1, '#4B0082')};
  }

  a {
    text-decoration: none;
    color: #ffffff;
  }
`
