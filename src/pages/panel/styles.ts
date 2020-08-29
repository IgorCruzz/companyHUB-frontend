import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  width: 100%:

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

export const Header = styled.div`
  @media (max-width: 460px) {
    padding: 15px 5px;
    height: 190px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  background: rgba(196, 196, 196, 0.2);
  width: 100%;
  height: 150px;

  h1 {
    @media (max-width: 460px) {
      text-align: center;
    }

    font-size: 6rem;
  }

  p {
    margin: 5px;
  }
`

export const ProductGrid = styled.div`
  @media (max-width: 400px) {
    max-width: 100%;
  }

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-gap: 10px;
  padding: 20px;
  max-width: 70%;
`
export const Company = styled.div`
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;

    small {
      color: #4f4f4f;
    }
  }
`

export const ProductName = styled.div`
  margin-top: 10px;
  width: 100%;
  background: #7159c1;
  color: #ffffff;
  text-align: center;
`

export const NoService = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50%;
`

export const ServiceList = styled.div`
  margin-top: 5px;
  overflow: auto;
  height: 190px;

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

export const Product = styled.div`
  @media (max-width: 860px) {
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

export const CompanyList = styled.div`
  ul {
    list-style: none;
    li {
      @media (max-width: 350px) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      background: #4b0082;
      border-radius: 25px;
      margin: 20px 0;
      padding: 10px;
      color: #ffffff;
    }
  }
`
