import { IProduct } from '../product/types'

export enum RepositoriesTypes {
  COMPANY_REGISTER_REQUEST = '@company/COMPANY_REGISTER_REQUEST',
  COMPANY_REGISTER_FAILURE = '@company/COMPANY_REGISTER_FAILURE',
  COMPANY_REGISTER_SUCCESS = '@company/COMPANY_REGISTER_SUCCESS',
  COMPANY_DELETE = '@company/COMPANY_DELETE',
  COMPANY_UPDATE_REQUEST = '@company/COMPANY_UPDATE_REQUEST',
  COMPANY_UPDATE_FAILURE = '@company/COMPANY_UPDATE_FAILURE',
  COMPANY_UPDATE_SUCCESS = '@company/COMPANY_UPDATE_SUCCESS',
}

export interface ICreateCompany {
  name: string
  cnpj: string
}

export interface IUpdateCompany {
  id: number
  name: string
  cnpj: string
}

export interface ICompanyState {
  company: {
    loading: boolean
  }
}

export interface ICompany {
  id: number
  name: string
  cnpj: string
  user_id: number
  productConnection: IProduct[]
}
