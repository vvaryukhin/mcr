import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const BrowserRouter: React.FC = ({ children }) => {
  return <Router history={history}>{children}</Router>;
};

export default BrowserRouter;
