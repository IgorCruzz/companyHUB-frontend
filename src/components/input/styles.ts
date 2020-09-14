import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  #error {
    border: 3px solid #ff0000;
  }
`

export const Error = styled.div`
  display: flex;
  align-items: center;

  background: #8b0000;
  font-size: 1.5rem;
  color: #ffffff;
  padding: 5px;

  font-weight: bold;

  svg {
    margin-right: 10px;
  }
`
