import { IService } from '../service/types'

export enum RepositoriesTypes {
  PRODUCT_REGISTER_REQUEST = '@product/PRODUCT_REGISTER_REQUEST',
  PRODUCT_REGISTER_FAILURE = '@product/PRODUCT_REGISTER_FAILURE',
  PRODUCT_REGISTER_SUCCESS = '@product/PRODUCT_REGISTER_SUCCESS',
  PRODUCT_DELETE = '@product/PRODUCT_DELETE',
  PRODUCT_UPDATE_REQUEST = '@product/PRODUCT_UPDATE_REQUEST',
  PRODUCT_UPDATE_FAILURE = '@product/PRODUCT_UPDATE_FAILURE',
  PRODUCT_UPDATE_SUCCESS = '@product/PRODUCT_UPDATE_SUCCESS',
}

export interface ICreateProduct {
  name: string
  company_id: number
}

export interface IUpdateProduct {
  id: number
  name: string
  company_id: number
}

export interface IProductState {
  product: {
    loading: boolean
  }
}

export interface IProduct {
  id: number
  name: string
  company_id: number
  serviceConnection: IService[]
}
