import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import Plans from '~/pages/Plans';
import Registrations from '~/pages/Registrations';
import HelpOrders from '~/pages/HelpOrders';

import newStudent from '~/pages/Dashboard/newStudent';
import editStudent from '~/pages/Dashboard/editStudent';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/dashboard/new" component={newStudent} isPrivate />
      <Route path="/dashboard/edit" component={editStudent} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
