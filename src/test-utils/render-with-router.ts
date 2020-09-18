import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export default function renderWithRouter(ui: ReactElement) {
  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
}
