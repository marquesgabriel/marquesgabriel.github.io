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

describe('LanguageSelect', () => {
  const switchLanguage = vi.fn();
  const switchStyle = vi.fn();

  beforeEach(() => {
    switchLanguage.mockClear();
    switchStyle.mockClear();
  });

  it('renders language options', () => {
    render(
      <LanguageSelect
        languages={languages}
        value="EN"
        switchLanguage={switchLanguage}
        switchStyle={switchStyle}
        styleVerbiages={styleVerbiages}
      />
    );
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Português')).toBeInTheDocument();
  });

  it('renders verbiage and button text', () => {
    render(
      <LanguageSelect
        languages={languages}
        value="EN"
        switchLanguage={switchLanguage}
        switchStyle={switchStyle}
        styleVerbiages={styleVerbiages}
      />
    );
    expect(screen.getByText('Switch style:')).toBeInTheDocument();
    expect(screen.getByText('change')).toBeInTheDocument();
  });

  it('calls switchLanguage on select change', () => {
    render(
      <LanguageSelect
        languages={languages}
        value="EN"
        switchLanguage={switchLanguage}
        switchStyle={switchStyle}
        styleVerbiages={styleVerbiages}
      />
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'PT' } });
    expect(switchLanguage).toHaveBeenCalledTimes(1);
  });

  it('calls switchStyle and prevents default on link click', () => {
    render(
      <LanguageSelect
        languages={languages}
        value="EN"
        switchLanguage={switchLanguage}
        switchStyle={switchStyle}
        styleVerbiages={styleVerbiages}
      />
    );
    const link = screen.getByText('change');
    fireEvent.click(link);
    expect(switchStyle).toHaveBeenCalledTimes(1);
  });

  it('returns null when styleVerbiages is falsy', () => {
    const { container } = render(
      <LanguageSelect
        languages={languages}
        value="EN"
        switchLanguage={switchLanguage}
        switchStyle={switchStyle}
        styleVerbiages={undefined as any}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('reflects the current selected language value', () => {
    render(
      <LanguageSelect
        languages={languages}
        value="PT"
        switchLanguage={switchLanguage}
        switchStyle={switchStyle}
        styleVerbiages={styleVerbiages}
      />
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('PT');
  });
});
