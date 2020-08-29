import React, { ComponentType } from 'react'
import {
  Route as ReactDOMRoute,
  Redirect,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import DefaultLayout from '../pages/_layouts/default'
import AuthLayout from '../pages/_layouts/auth'
import { ILoginState } from '../store/ducks/repositories/signin/types'

interface Props extends ReactDOMRouteProps {
  isPrivate?: boolean
  component: ComponentType
}

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}: Props) {
  const signed = useSelector((state: ILoginState) => state.signIn.signed)

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />
  }
  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  const Layout = signed ? DefaultLayout : AuthLayout

  return (
    <ReactDOMRoute
      {...rest}
      render={() => (
        <Layout>
          <Component />
        </Layout>
      )}
    />
  )
}
