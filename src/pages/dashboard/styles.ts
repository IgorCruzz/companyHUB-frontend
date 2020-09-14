import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
`

interface Props {
  readonly company: boolean
}

export const Content = styled.div<Props>`
  width: 100%;
  max-width: 1400px;
  display: ${(props) => (props.company ? 'block' : 'flex')};
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const PanelLink = styled.div`
  @media (max-width: 540px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    height: 50px;
    width: 100%;
    margin: 10px 0;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      padding: 7px;
      font-size: 2.5rem;
      border-radius: 25px;
      background: #4b0082;
      text-decoration: none;
      color: #ffffff;
      &:hover {
        background: ${darken(0.1, '#4B0082')};
      }
    }
  }
  display: none;
`

export const Header = styled.div`
  @media(max-width: 650px) {
    flex-direction: column;
    height: 250px;
  }

  background: rgba(196, 196, 196, 0.2);
  width: 100%;
  height: 200px;

  display flex;
  align-items: center;
  justify-content: space-around;

  a {
    text-decoration: none;
    background: #7159C1;
    border-radius: 25px;
    font-weight: bold;
    padding: 15px;
    color: #FFFFFF;
    font-size: 2.0rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 1.5rem;
      height: 30px;
      width: 30px;
    }

    &:hover {
      background: ${darken(0.2, '#7159C1')}
    }
  }
`

export const NoCompany = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;

  strong {
    margin-bottom: 25px;
    font-size: 5rem;
    color: #ffffff;
    text-align: center;
  }

  a {
    text-decoration: none;
    background: ${darken(0.05, '#7159C1')};
    border-radius: 25px;
    font-weight: bold;
    padding: 15px;
    color: #ffffff;
    font-size: 2rem;
    display: flex;
    align-items: center;
    width: 300px;

    svg {
      margin-right: 15px;
      height: 30px;
      width: 30px;
    }

    &:hover {
      background: ${darken(0.3, '#7159C1')};
    }
  }
`

export const NoProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;

  strong {
    margin-bottom: 25px;
    font-size: 4rem;
    color: #ffffff;
    text-align: center;
  }
`

export const NoService = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50%;
`

export const Company = styled.div`
@media(max-width: 650px) {
  align-items:center;
}

  color: #FFFFFF;

  display: flex;
  flex-direction: column;

  strong {
    font-size: 6.0rem;
    margin: 10px;
  }

  small {
    font-size: 1.9rem;
    margin: 10px;
  }

  button {
    margin: 10px;
    border-radius: 50%;
    border: 0;
    background: #483D8B;
    height: 30px;
    width: 30px;
    margin: 6px;

    svg {

      color: #FFFFFF;
    }

    &:hover {
      background: ${lighten(0.1, '#483D8B')}
    }
`

export const ProductGrid = styled.div`
  @media (max-width: 400px) {
    margin: 20px 0;
  }

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-gap: 10px;
  padding: 20px;
  margin: 60px;
`

export const Product = styled.div`
  @media (max-width: 700px) {
    justify-self: center;
  }

  width: 280px;
  height: 350px;
  background: #ffffff;
  border-radius: 25px;
  padding: 15px;

  #edit {
    border-radius: 50%;
    border: 0;
    background: #483d8b;
    height: 30px;
    width: 30px;
    margin: 0 10px;

    svg {
      color: #ffffff;
    }

    &:hover {
      background: ${lighten(0.2, '#483D8B')};
    }
  }

  #delete {
    border-radius: 50%;
    border: 0;
    background: #483d8b;
    height: 30px;
    width: 30px;

    svg {
      color: #ffffff;
    }

    &:hover {
      background: ${lighten(0.2, '#483D8B')};
    }
  }
`

export const ProductName = styled.div`
  margin-top: 10px;
  width: 100%;
  background: #7159c1;
  color: #ffffff;
  text-align: center;
  padding: 5px 15px;
`

export const RegisterService = styled.div`
  margin-top: 10px;
  background: #483d8b;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${lighten(0.2, '#483D8B')};
  }

  a {
    padding: 5px;
    text-decoration: none;
    color: #ffffff;
  }
`

export const ServiceList = styled.div`
  margin-top: 5px;
  overflow: auto;
  height: 200px;

  ::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #7159c1;
    border-radius: 10px;
  }
`

export const Service = styled.div`
  margin: 15px 0;
`

export const ServiceName = styled.div`
  background: #6a5acd;
  padding: 5px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;

  #editService {
    border-radius: 50%;
    border: 0;
    background: #483d8b;
    height: 20px;
    width: 20px;
    margin: 0 10px;

    svg {
      color: #ffffff;
      height: 15px;
      width: 15px;
    }

    &:hover {
      background: ${lighten(0.2, '#483D8B')};
    }
  }

  #deleteService {
    border-radius: 50%;
    border: 0;
    background: #483d8b;
    height: 20px;
    width: 20px;

    svg {
      color: #ffffff;
      height: 15px;
      width: 15px;
    }

    &:hover {
      background: ${lighten(0.2, '#483D8B')};
    }
  }
`

export const ServiceDescription = styled.div`
  background: #836fff;
  padding: 5px;
  color: #ffffff;
`
