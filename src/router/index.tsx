import React from 'react';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';

export const history = createHashHistory();

const BrowserRouter: React.FC = ({ children }) => {
  return <Router history={history}>{children}</Router>;
};

export default BrowserRouter;
