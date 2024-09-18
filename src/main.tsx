import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from './navigations/Navigation';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navigation />
  </StrictMode>,
);
