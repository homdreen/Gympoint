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

import newPlan from '~/pages/Plans/newPlan';
import editPlan from '~/pages/Plans/editPlan';

import newRegistration from '~/pages/Registrations/newRegistration';
import editRegistration from '~/pages/Registrations/editRegistration';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/dashboard/new" component={newStudent} isPrivate />
      <Route path="/dashboard/edit" component={editStudent} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/new" exact component={newPlan} isPrivate />
      <Route path="/plans/edit" exact component={editPlan} isPrivate />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route path="/registrations/new" component={newRegistration} isPrivate />
      <Route
        path="/registrations/edit"
        component={editRegistration}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
