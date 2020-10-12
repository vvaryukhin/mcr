import React from 'react';
import ProtectedRoute from 'router/ProtectedRoute';
import { screen } from '@testing-library/react';
import { renderWithRouter } from 'test-utils';

const DummyComponent = () => <div data-test-id="dummy"></div>;

describe('ProtectedRoute', () => {
  it('should render component if condition returns `true`', () => {
    renderWithRouter(
      <ProtectedRoute
        condition={() => true}
        component={DummyComponent}
        path={'/'}
        redirectPath={'/redirect'}
      />
    );
    expect(screen.queryByTestId('dummy')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  it('should redirect if condition returns `false`', () => {
    renderWithRouter(
      <ProtectedRoute
        condition={() => false}
        component={DummyComponent}
        path={'/'}
        redirectPath={'/redirect'}
      />
    );
    expect(screen.queryByTestId('dummy')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/redirect');
  });
});
