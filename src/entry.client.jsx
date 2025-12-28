import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HydratedRouter } from "react-router/dom";
import './index.css';

import { DateProvider } from './DateContext';

ReactDOM.hydrateRoot(
  document,
  <StrictMode>
    <DateProvider>
      <HydratedRouter />
    </DateProvider>
  </StrictMode>
);
