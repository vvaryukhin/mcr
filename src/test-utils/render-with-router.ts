import { ReactElement } from 'react';
import BrowserRouter from 'router';
import { render } from '@testing-library/react';

export default function renderWithRouter(ui: ReactElement) {
  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
}
