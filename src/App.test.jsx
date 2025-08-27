import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResizeObserver } from '@juggle/resize-observer';
import { it, describe, expect, vi } from 'vitest';

import { DateProvider } from './DateContext';
import App from './App';

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn(),
};

global.navigator.geolocation = mockGeolocation;
global.ResizeObserver = ResizeObserver;

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <DateProvider date={new Date()}>{children}</DateProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

describe('Does the app render default route', () => {
  it('Renders default route', () => {
    customRender(<App />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    const LINK_NAMES = ['Moon Info', 'Lunar Club', 'Lunar II Club'];
    links.forEach((link) => {
      expect(LINK_NAMES).toContain(link.text);
    });
    let MAIN_IMAGE = 'Lunar Club Tools';
    const mainImage = screen.getByRole('img', { name: MAIN_IMAGE });
    expect(mainImage.alt).toBe(MAIN_IMAGE);
  });

  it('Renders Moon Info tab route', async () => {
    customRender(<App />);
    await userEvent.click(screen.getByRole('link', { name: 'Moon Info Tab Moon Info' }));
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(4);
    const DIV_NAMES = ['Ephemeris', 'Next Four Phases', 'Phase and Libration', 'Sky Position'];
    headings.forEach((heading) => {
      expect(DIV_NAMES).toContain(heading.innerHTML);
    });
  });

  it('Renders Lunar Club tab route', async () => {
    customRender(<App />);
    await userEvent.click(screen.getByRole('link', { name: 'Lunar Club Tab Lunar Club' }));
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(4);
    const DIV_NAMES = ['Special', 'Naked Eye', 'Binocular', 'Telescope'];
    headings.forEach((heading) => {
      expect(DIV_NAMES).toContain(heading.innerHTML);
    });
  });

  it('Renders Lunar 2 Club tab route', async () => {
    customRender(<App />);
    await userEvent.click(screen.getByRole('link', { name: 'Lunar 2 Club Tab Lunar II Club' }));
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(2);
    const DIV_NAMES = ['Features', 'Landing Sites'];
    headings.forEach((heading, index) => {
      expect(DIV_NAMES).toContain(heading.innerHTML);
    });
  });
});
