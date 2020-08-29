import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 5px;
  }

  display: flex;
  width: 70%;

  justify-content: space-between;
  margin: 30px;

  p {
    width: 60%;
    font-size: 3rem;
    font-weight: bold;
    color: #ffffff;
  }
`
export const Title = styled.div`
  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 0;
    width: 80%;
  }

  margin-right: 50px;

  h1 {
    @media (max-width: 950px) {
      margin-bottom: 20px;
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
