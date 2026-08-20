import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const CONSENT_KEY = 'marquesgabriel.github.io:cookie-consent';

async function loadComponent() {
  vi.resetModules();
  const mod = await import('../SupportSidebar');
  return mod.SupportSidebar;
}

describe('SupportSidebar', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    window.localStorage.clear();
    cleanup();
  });

  it('renders nothing when no publisher id is configured', async () => {
    vi.stubEnv('REACT_APP_ADSENSE_PUBLISHER_ID', '');
    const SupportSidebar = await loadComponent();
    const { container } = render(<SupportSidebar />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the consent prompt when a publisher id is configured and no consent is stored', async () => {
    vi.stubEnv('REACT_APP_ADSENSE_PUBLISHER_ID', 'ca-pub-test');
    const SupportSidebar = await loadComponent();
    render(<SupportSidebar />);
    expect(screen.getByText(/accept cookies to enable them/i)).toBeInTheDocument();
  });

  it('stores consent and renders the ad slot on accept', async () => {
    vi.stubEnv('REACT_APP_ADSENSE_PUBLISHER_ID', 'ca-pub-test');
    const SupportSidebar = await loadComponent();
    render(<SupportSidebar />);
    fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe('accepted');
    expect(document.querySelector('.adsbygoogle')).toBeInTheDocument();
  });

  it('stores consent and skips the ad slot on decline', async () => {
    vi.stubEnv('REACT_APP_ADSENSE_PUBLISHER_ID', 'ca-pub-test');
    const SupportSidebar = await loadComponent();
    render(<SupportSidebar />);
    fireEvent.click(screen.getByRole('button', { name: /decline/i }));
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe('declined');
    expect(screen.queryByText(/accept cookies to enable them/i)).toBeNull();
    expect(document.querySelector('.adsbygoogle')).toBeNull();
  });

  it('respects previously stored consent on mount', async () => {
    window.localStorage.setItem(CONSENT_KEY, 'accepted');
    vi.stubEnv('REACT_APP_ADSENSE_PUBLISHER_ID', 'ca-pub-test');
    const SupportSidebar = await loadComponent();
    render(<SupportSidebar />);
    expect(document.querySelector('.adsbygoogle')).toBeInTheDocument();
  });
});
