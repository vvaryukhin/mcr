import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IProtectedRouteProps extends RouteProps {
  component: NonNullable<RouteProps['component']>;
  condition: () => boolean;
  redirectPath: string;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  component: Component,
  condition,
  redirectPath,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={data => {
        return condition() ? (
          <Component {...data} />
        ) : (
          <Redirect to={redirectPath} />
        );
      }}
    ></Route>
  );
};

export default ProtectedRoute;
