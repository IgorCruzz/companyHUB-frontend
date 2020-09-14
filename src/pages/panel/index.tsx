import React, { useEffect, useState } from 'react'

import {
  Container,
  Content,
  Header,
  ProductGrid,
  Company,
  CompanyList,
  ProductName,
  Product,
  NoService,
  ServiceList,
  Service,
  ServiceName,
  ServiceDescription,
} from './styles'
import { api } from '../../services/api'
import { IService } from '../../store/ducks/repositories/service/types'
import { ICompany } from '../../store/ducks/repositories/company/types'

interface IProductList {
  id: number
  name: string
  company_id: number
  serviceConnection: IService[]
  companyConnection: {
    id: number
    name: string
    cnpj: string
    user_id: number
  }
}

const Panel: React.FC = () => {
  const [products, setProducts] = useState<IProductList[]>()
  const [companies, setCompanies] = useState<ICompany[]>()
  const [companyLength, setCompanyLength] = useState(0)
  const [productLength, setProductLength] = useState(0)

  useEffect(() => {
    api.get('companies').then((response) => {
      setCompanies(response.data)
      setCompanyLength(response.data.length)
    })
  }, [])

  useEffect(() => {
    api.get('products').then((response) => {
      setProducts(response.data)
      setProductLength(response.data.length)
    })
  }, [])

  return (
    <Container>
      <Content>
        <Header>
          <h1>Painel Administrativo</h1>

          <p>Total de empresas cadastradas: {companyLength}</p>
          <p>Total de produtos cadastrados: {productLength}</p>
        </Header>
        <CompanyList data-testid="company">
          <ul>
            {companies?.map((company) => (
              <li key={company.id}>
                empresa: {company.name} - cnpj: {company.cnpj}
              </li>
            ))}
          </ul>
        </CompanyList>
        <ProductGrid>
          {products?.map((product) => (
            <Product key={product.id}>
              <Company>
                <p>
                  <small>Empresa:</small> {product.companyConnection.name}
                </p>
                <p>
                  <small>Cnpj:</small> {product.companyConnection.cnpj}
                </p>
              </Company>

              <ProductName>
                <h1>{product.name}</h1>
              </ProductName>

              {product.serviceConnection?.length === 0 ? (
                <NoService>
                  <p data-testid="paragph">Este produto não possui serviços</p>
                </NoService>
              ) : (
                <ServiceList>
                  {product.serviceConnection.map((service) => (
                    <Service key={service.id}>
                      <ServiceName>
                        <strong>{service.name}</strong>
                      </ServiceName>

                      <ServiceDescription>
                        <p>{service.description}</p>
                      </ServiceDescription>
                    </Service>
                  ))}
                </ServiceList>
              )}
            </Product>
          ))}
        </ProductGrid>
      </Content>
    </Container>
  )
}
export default Panel
