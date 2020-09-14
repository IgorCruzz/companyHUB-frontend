import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './routes'

import Dashboard from '../pages/dashboard'
import Signin from '../pages/signin'
import SignUp from '../pages/signup'
import Service from '../pages/service/create'
import Product from '../pages/product/create'
import Company from '../pages/company/create'
import Message from '../pages/message'
import Settings from '../pages/settings'
import Authentication from '../pages/authentication'
import Panel from '../pages/panel'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/signup" component={SignUp} />
      <Route path="/message" component={Message} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/:product/service" component={Service} isPrivate />
      <Route path="/:company/product" component={Product} isPrivate />
      <Route path="/company" component={Company} isPrivate />
      <Route path="/setting" component={Settings} isPrivate />
      <Route path="/auth/:token" component={Authentication} />
      <Route path="/panel" component={Panel} isPrivate />
    </Switch>
  )
}
