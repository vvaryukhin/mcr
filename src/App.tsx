import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login';
import ErrorPage from 'pages/Error';
import Notifications from 'components/Notification';
import ProtectedRoute from 'router/ProtectedRoute';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute
          path="/"
          component={Main}
          condition={() => !!sessionStorage.getItem('token')}
          redirectPath="/login"
          exact
        />
        <ProtectedRoute
          path="/login"
          component={Login}
          condition={() => !sessionStorage.getItem('token')}
          redirectPath="/"
          exact
        />
        <Route path="*" component={ErrorPage} />
      </Switch>
      <Notifications />
    </div>
  );
}

export default App;
