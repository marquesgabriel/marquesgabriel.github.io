import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelect } from '../LanguageSelect';

const languages = [
  { id: 1, name: 'EN', description: 'English', active: true },
  { id: 2, name: 'PT', description: 'Português', active: true },
];

const styleVerbiages = {
  id: 1,
  lang_id: 1,
  verbiage: 'Switch style:',
  button_verbiage: 'change',
};

const defaultProps = {
  languages,
  value: 'EN' as string,
  switchLanguage: vi.fn(),
  switchStyle: vi.fn(),
  styleVerbiages,
};

describe('LanguageSelect', () => {
  beforeEach(() => {
    defaultProps.switchLanguage.mockClear();
    defaultProps.switchStyle.mockClear();
  });

  // ─── guard ────────────────────────────────────────────────────────────────

  it('returns null when styleVerbiages is falsy', () => {
    const { container } = render(
      <LanguageSelect {...defaultProps} styleVerbiages={undefined as any} />
    );
    expect(container.firstChild).toBeNull();
  });

  // ─── desktop bar ──────────────────────────────────────────────────────────

  describe('desktop bar', () => {
    it('renders language options', () => {
      render(<LanguageSelect {...defaultProps} />);
      // both desktop and mobile render options — getAllByText to avoid multiple match error
      expect(screen.getAllByText('English').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Português').length).toBeGreaterThan(0);
    });

    it('renders verbiage and button text', () => {
      render(<LanguageSelect {...defaultProps} />);
      expect(screen.getAllByText('Switch style:').length).toBeGreaterThan(0);
      expect(screen.getAllByText('change').length).toBeGreaterThan(0);
    });

    it('reflects the current selected language value on desktop select', () => {
      render(<LanguageSelect {...defaultProps} value="PT" />);
      // desktop select is the first combobox in the DOM
      const selects = screen.getAllByRole('combobox') as HTMLSelectElement[];
      expect(selects[0].value).toBe('PT');
    });

    it('calls switchLanguage when desktop select changes', () => {
      render(<LanguageSelect {...defaultProps} />);
      const selects = screen.getAllByRole('combobox');
      fireEvent.change(selects[0], { target: { value: 'PT' } });
      expect(defaultProps.switchLanguage).toHaveBeenCalledTimes(1);
    });

    it('calls switchStyle when desktop link is clicked', () => {
      render(<LanguageSelect {...defaultProps} />);
      // desktop link is inside .d-none.d-sm-block — pick the first anchor
      const links = screen.getAllByRole('link', { name: 'change' });
      fireEvent.click(links[0]);
      expect(defaultProps.switchStyle).toHaveBeenCalledTimes(1);
    });
  });

  // ─── mobile hamburger + drawer ────────────────────────────────────────────

  describe('mobile menu', () => {
    it('renders the hamburger button', () => {
      render(<LanguageSelect {...defaultProps} />);
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
    });

    it('drawer is closed by default (no is-open class)', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      const drawer = container.querySelector('.mobile-menu-drawer');
      expect(drawer).not.toHaveClass('is-open');
    });

    it('overlay is not rendered when drawer is closed', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      expect(container.querySelector('.mobile-menu-overlay')).toBeNull();
    });

    it('opens the drawer when hamburger is clicked', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      expect(container.querySelector('.mobile-menu-drawer')).toHaveClass('is-open');
    });

    it('renders overlay when drawer is open', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      expect(container.querySelector('.mobile-menu-overlay')).toBeInTheDocument();
    });

    it('hamburger has aria-expanded=false when closed', () => {
      render(<LanguageSelect {...defaultProps} />);
      expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('hamburger has aria-expanded=true when open', () => {
      render(<LanguageSelect {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('closes the drawer when close button is clicked', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
      expect(container.querySelector('.mobile-menu-drawer')).not.toHaveClass('is-open');
    });

    it('closes the drawer when overlay is clicked', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      fireEvent.click(container.querySelector('.mobile-menu-overlay')!);
      expect(container.querySelector('.mobile-menu-drawer')).not.toHaveClass('is-open');
    });

    it('calls switchLanguage and closes drawer when mobile select changes', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      const mobileSelect = screen.getByLabelText('Language') as HTMLSelectElement;
      fireEvent.change(mobileSelect, { target: { value: 'PT' } });
      expect(defaultProps.switchLanguage).toHaveBeenCalledTimes(1);
      expect(container.querySelector('.mobile-menu-drawer')).not.toHaveClass('is-open');
    });

    it('reflects the current value on the mobile select', () => {
      render(<LanguageSelect {...defaultProps} value="PT" />);
      const mobileSelect = screen.getByLabelText('Language') as HTMLSelectElement;
      expect(mobileSelect.value).toBe('PT');
    });

    it('calls switchStyle and closes drawer when mobile style link is clicked', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      const drawer = container.querySelector('.mobile-menu-drawer')!;
      const mobileLink = drawer.querySelector('.mobile-menu-action')!;
      fireEvent.click(mobileLink);
      expect(defaultProps.switchStyle).toHaveBeenCalledTimes(1);
      expect(container.querySelector('.mobile-menu-drawer')).not.toHaveClass('is-open');
    });

    it('renders the style verbiage label inside the drawer', () => {
      const { container } = render(<LanguageSelect {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
      const drawer = container.querySelector('.mobile-menu-drawer')!;
      expect(drawer.textContent).toContain('Switch style:');
    });
  });
});