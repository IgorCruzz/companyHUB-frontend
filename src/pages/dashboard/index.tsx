import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { BsTrash } from 'react-icons/bs'
import { api } from '../../services/api'
import {
  Container,
  Content,
  PanelLink,
  NoCompany,
  NoService,
  NoProduct,
  RegisterService,
  Header,
  Company,
  ProductGrid,
  Product,
  ProductName,
  ServiceList,
  Service,
  ServiceDescription,
  ServiceName,
} from './styles'
import { Dialog } from '../../components/dialog'
import { companyDelete } from '../../store/ducks/repositories/company/actions'
import { serviceDelete } from '../../store/ducks/repositories/service/actions'
import { productDelete } from '../../store/ducks/repositories/product/actions'
import { CompanyUpdate } from '../company/update'
import { ProductUpdate } from '../product/update'
import { ServiceUpdate } from '../service/update'
import { IUserState } from '../../store/ducks/repositories/user/types'
import { ICompany } from '../../store/ducks/repositories/company/types'
import { IProduct } from '../../store/ducks/repositories/product/types'

export const Dashboard: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openProductDialog, setOpenProductDialog] = useState(false)
  const [openCompanyDialog, setCompanyDialog] = useState(false)

  const { id, administrator } = useSelector(
    (state: IUserState) => state.user.profile
  )

  const [company, setCompany] = useState<ICompany | undefined>()
  const [products, setProducts] = useState<IProduct[]>()

  const [serviceDeleteData, setServiceDeleteData] = useState({
    id: 0,
    product_id: 0,
  })
  const [productDeleteData, setProductDeleteData] = useState({
    id: 0,
    company_id: 0,
  })
  const [companyDeleteData, setCompanyDeleteData] = useState({ id: 0 })

  const [openModal, setOpenModal] = useState(false)
  const [openModalProduct, setOpenModalProduct] = useState(false)
  const [openModalService, setOpenModalService] = useState(false)

  useEffect(() => {
    try {
      api.get(`/companies/${id}`).then((response) => {
        setCompany(response.data)
      })
    } catch (err) {
      console.log('NAO TINENES NADIKAS AQUI')
    }
  }, [id, company])

  useEffect(() => {
    if (company === undefined) return

    api.get(`/products/${company?.id}`).then((response) => {
      setProducts(response.data)
    })
  }, [company])

  return (
    <Container>
      <Dialog
        open={openDialog}
        close={() => setOpenDialog(false)}
        data={serviceDeleteData}
        action={serviceDelete}
      />
      <Dialog
        open={openProductDialog}
        close={() => setOpenProductDialog(false)}
        data={productDeleteData}
        action={productDelete}
      />
      <Dialog
        open={openCompanyDialog}
        close={() => setCompanyDialog(false)}
        data={companyDeleteData}
        action={companyDelete}
      />

      <Content company={company !== undefined}>
        {company === undefined ? (
          <NoCompany>
            <strong>
              Cadastre sua empresa para poder começar a utilizar nossos
              serviços.
            </strong>
            <Link to="/company">
              <FiPlus /> CADASTRAR EMPRESA
            </Link>
          </NoCompany>
        ) : (
          <>
            <CompanyUpdate
              open={openModal}
              close={() => setOpenModal(false)}
              initData={{
                id: company?.id,
                name: company?.name,
                cnpj: company?.cnpj,
              }}
            />

            {administrator && (
              <PanelLink>
                <Link to="/panel">Painel Administrativo</Link>
              </PanelLink>
            )}

            <Header>
              <Company>
                <strong>{company?.name}</strong>
                <small>Cnpj: {company?.cnpj}</small>

                <div>
                  <button
                    id="delete"
                    type="button"
                    onClick={() => {
                      setCompanyDeleteData({ id: company?.id })
                      setCompanyDialog(true)
                    }}>
                    <BsTrash />
                  </button>
                  <button
                    id="edit"
                    onClick={() => setOpenModal(true)}
                    type="button">
                    <FiEdit2 />
                  </button>
                </div>
              </Company>

              <Link to={`${company?.id}/product`}>
                <FiPlus /> CADASTRAR PRODUTO
              </Link>
            </Header>

            {company?.productConnection?.length === 0 ? (
              <NoProduct>
                <strong>
                  Sua empresa ainda não possui produtos cadastrados
                </strong>
              </NoProduct>
            ) : (
              <ProductGrid>
                {products?.map((product) => (
                  <Product key={product.id}>
                    <ProductUpdate
                      open={openModalProduct}
                      close={() => setOpenModalProduct(false)}
                      initData={{
                        id: product?.id,
                        name: product?.name,
                        company_id: product?.company_id,
                      }}
                    />

                    <button
                      id="edit"
                      type="button"
                      onClick={() => {
                        setProductDeleteData({
                          id: product.id,
                          company_id: product.company_id,
                        })
                        setOpenProductDialog(true)
                      }}>
                      <BsTrash />
                    </button>
                    <button
                      id="delete"
                      type="button"
                      onClick={() => setOpenModalProduct(true)}>
                      <FiEdit2 />
                    </button>

                    <ProductName>
                      <strong>{product.name}</strong>
                    </ProductName>

                    <RegisterService>
                      <Link to={`${product.id}/service`}>
                        <FiPlus /> CADASTRAR SERVIÇO
                      </Link>
                    </RegisterService>

                    {product.serviceConnection?.length === 0 ? (
                      <NoService>
                        <p>Este produto não possui serviços </p>
                      </NoService>
                    ) : (
                      <ServiceList>
                        {product.serviceConnection.map((service) => (
                          <Service key={service.id}>
                            <ServiceUpdate
                              open={openModalService}
                              close={() => setOpenModalService(false)}
                              initData={{
                                id: service?.id,
                                name: service?.name,
                                description: service?.description,
                                product_id: service?.product_id,
                              }}
                            />

                            <ServiceName>
                              <strong>{service.name}</strong>

                              <div>
                                <button
                                  id="editService"
                                  type="button"
                                  onClick={() => {
                                    setServiceDeleteData({
                                      id: service.id,
                                      product_id: service.product_id,
                                    })
                                    setOpenDialog(true)
                                  }}>
                                  <BsTrash />
                                </button>
                                <button
                                  id="deleteService"
                                  type="button"
                                  onClick={() => setOpenModalService(true)}>
                                  <FiEdit2 />
                                </button>
                              </div>
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
            )}
          </>
        )}
      </Content>
    </Container>
  )
}
