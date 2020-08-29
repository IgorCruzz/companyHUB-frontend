export enum RepositoriesTypes {
  SERVICE_REGISTER_REQUEST = '@service/SERVICE_REGISTER_REQUEST',
  SERVICE_REGISTER_FAILURE = '@service/SERVICE_REGISTER_FAILURE',
  SERVICE_REGISTER_SUCCESS = '@service/SERVICE_REGISTER_SUCCESS',
  SERVICE_DELETE = '@service/SERVICE_DELETE',
  SERVICE_UPDATE_REQUEST = '@service/SERVICE_UPDATE_REQUEST',
  SERVICE_UPDATE_FAILURE = '@service/SERVICE_UPDATE_FAILURE',
  SERVICE_UPDATE_SUCCESS = '@service/SERVICE_UPDATE_SUCCESS',
}

export interface ICreateService {
  name: string
  description: string
  product_id: number
}

export interface IUpdateService {
  id: number
  name: string
  description: string
  product_id: number
}

export interface IServiceState {
  service: {
    loading: boolean
  }
}

export interface IService {
  id: number
  name: string
  description: string
  product_id: number
}
