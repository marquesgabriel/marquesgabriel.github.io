import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import App from './App';

// ── mock supabase ──────────────────────────────────────────────────────────
const mockFrom = vi.fn();
vi.mock('./utils', () => ({
  supabase: {
    from: (table: string) => mockFrom(table),
  },
}));

// ── mock components to isolate App logic ──────────────────────────────────
vi.mock('./components', () => ({
  Container: ({ children, title }: any) => (
    <div data-testid="container" data-title={title}>
      {children}
    </div>
  ),
  LanguageSelect: ({ value, switchStyle, switchLanguage }: any) => (
    <div data-testid="lang-select">
      <span data-testid="active-lang">{value}</span>
      <button onClick={switchStyle}>switch style</button>
      <select data-testid="lang-dropdown" onChange={switchLanguage} value={value}>
        <option value="EN">English</option>
        <option value="PT">Português</option>
      </select>
    </div>
  ),
  Timeline: ({ list }: any) => (
    <ul>
      {list?.map((i: any) => (
        <li key={i._id}>{i.title}</li>
      ))}
    </ul>
  ),
}));

// ── helpers ───────────────────────────────────────────────────────────────

function makeSupabaseChain(data: any) {
  const chain: any = { select: vi.fn().mockReturnThis(), eq: vi.fn().mockResolvedValue({ data }) };
  chain.select.mockReturnValue(chain);
  return chain;
}

const LANGUAGES = [
  { id: 1, name: 'EN', description: 'English', active: true },
  { id: 2, name: 'PT', description: 'Português', active: true },
];

const STYLES = [{ id: 1, name: 'flat', isActive: true }];

const VERBIAGES_EN = {
  titles: { aboutMe: 'About', work: 'Work', study: 'Study', skills: 'Skills', links: 'Links' },
  aboutMe: { id: 1, lang_id: 1, content: ['Hello world'] },
  links: [{ description: 'GitHub', type: 'url', url: 'https://github.com' }],
  skills: [{ name: 'TypeScript', description: ['React'] }],
  study: [
    { _id: 's1', title: 'University', course: 'CS', startDate: '2016-01-01', endDate: '2020-01-01', description: null },
  ],
  work: [
    {
      _id: 'w1',
      title: 'Acme',
      subTitle: 'Dev',
      location: 'Remote',
      startDate: '2021-01-01',
      endDate: null,
      description: null,
    },
  ],
  styleSwitchVerbiages: { id: 1, lang_id: 1, verbiage: 'Switch:', button_verbiage: 'change' },
};

const VERBIAGES_PT = {
  ...VERBIAGES_EN,
  aboutMe: { id: 2, lang_id: 2, content: ['Olá mundo'] },
  styleSwitchVerbiages: { id: 2, lang_id: 2, verbiage: 'Mudar:', button_verbiage: 'alterar' },
};

function setupMocks(browserLang = 'en') {
  // clear localStorage
  localStorage.clear();

  // mock navigator.languages
  Object.defineProperty(navigator, 'languages', {
    value: [browserLang + '-US'],
    configurable: true,
  });

  mockFrom.mockImplementation((table: string) => {
    const dataMap: Record<string, any> = {
      languages: LANGUAGES,
      styles: STYLES,
      titles: [VERBIAGES_EN.titles],
      about_me: [VERBIAGES_EN.aboutMe],
      links: VERBIAGES_EN.links,
      skills: VERBIAGES_EN.skills,
      study_experience: VERBIAGES_EN.study,
      work_experience: VERBIAGES_EN.work,
      style_switch_verbiage: [VERBIAGES_EN.styleSwitchVerbiages],
    };
    return makeSupabaseChain(dataMap[table] ?? []);
  });
}

// ── tests ─────────────────────────────────────────────────────────────────

describe('App', () => {
  beforeEach(() => {
    setupMocks();
    // body class cleanup
    document.body.className = '';
  });

  it('renders portfolio content after data loads', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('lang-select')).toBeInTheDocument());
  });

  it('detects browser language and loads matching content', async () => {
    setupMocks('en');
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('active-lang').textContent).toBe('EN'));
  });

  it('applies a style class to document.body', async () => {
    render(<App />);
    await waitFor(() => expect(document.body.classList.contains('flat')).toBe(true));
  });

  it('uses cached languages on second render', async () => {
    // first render — populates cache
    const { unmount } = render(<App />);
    await waitFor(() => screen.getByTestId('lang-select'));
    unmount();

    // second render — should use localStorage
    render(<App />);
    await waitFor(() => screen.getByTestId('lang-select'));
    // supabase.from('languages') called only once (first render)
    const langCalls = mockFrom.mock.calls.filter(([t]) => t === 'languages');
    expect(langCalls.length).toBe(1);
  });

  it('switchStyle picks a different style', async () => {
    const twoStyles = [
      { id: 1, name: 'flat', isActive: true },
      { id: 2, name: 'gothic', isActive: true },
    ];
    mockFrom.mockImplementation((table: string) => {
      const map: Record<string, any> = {
        languages: LANGUAGES,
        styles: twoStyles,
        titles: [VERBIAGES_EN.titles],
        about_me: [VERBIAGES_EN.aboutMe],
        links: VERBIAGES_EN.links,
        skills: VERBIAGES_EN.skills,
        study_experience: VERBIAGES_EN.study,
        work_experience: VERBIAGES_EN.work,
        style_switch_verbiage: [VERBIAGES_EN.styleSwitchVerbiages],
      };
      return makeSupabaseChain(map[table] ?? []);
    });
    render(<App />);
    await waitFor(() => screen.getByText('switch style'));
    const before = document.body.className;
    act(() => {
      fireEvent.click(screen.getByText('switch style'));
    });
    expect(document.body.className).not.toBe(before);
  });

  it('switchLanguage loads new verbiages', async () => {
    mockFrom.mockImplementation((table: string) => {
      // return PT verbiages when lang_id=2
      const chain: any = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockImplementation((_col: string, val: any) => {
          if (table === 'languages') return Promise.resolve({ data: LANGUAGES });
          if (table === 'styles') return Promise.resolve({ data: STYLES });
          if (val === 2) {
            const ptMap: Record<string, any> = {
              titles: [VERBIAGES_PT.titles],
              about_me: [VERBIAGES_PT.aboutMe],
              links: VERBIAGES_PT.links,
              skills: VERBIAGES_PT.skills,
              study_experience: VERBIAGES_PT.study,
              work_experience: VERBIAGES_PT.work,
              style_switch_verbiage: [VERBIAGES_PT.styleSwitchVerbiages],
            };
            return Promise.resolve({ data: ptMap[table] ?? [] });
          }
          const enMap: Record<string, any> = {
            titles: [VERBIAGES_EN.titles],
            about_me: [VERBIAGES_EN.aboutMe],
            links: VERBIAGES_EN.links,
            skills: VERBIAGES_EN.skills,
            study_experience: VERBIAGES_EN.study,
            work_experience: VERBIAGES_EN.work,
            style_switch_verbiage: [VERBIAGES_EN.styleSwitchVerbiages],
          };
          return Promise.resolve({ data: enMap[table] ?? [] });
        }),
      };
      chain.select.mockReturnValue(chain);
      return chain;
    });

    render(<App />);
    await waitFor(() => screen.getByTestId('lang-dropdown'));

    await act(async () => {
      fireEvent.change(screen.getByTestId('lang-dropdown'), { target: { value: 'PT' } });
    });

    await waitFor(() => expect(screen.getByTestId('active-lang').textContent).toBe('PT'));
  });

  it('switchLanguage does nothing when same language selected', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('lang-dropdown'));
    const callsBefore = mockFrom.mock.calls.length;
    await act(async () => {
      fireEvent.change(screen.getByTestId('lang-dropdown'), { target: { value: 'EN' } });
    });
    expect(mockFrom.mock.calls.length).toBe(callsBefore);
  });

  it('switchStyle does nothing when styles list is empty', async () => {
    mockFrom.mockImplementation((table: string) => {
      const map: Record<string, any> = {
        languages: LANGUAGES,
        styles: [],
        titles: [VERBIAGES_EN.titles],
        about_me: [VERBIAGES_EN.aboutMe],
        links: VERBIAGES_EN.links,
        skills: VERBIAGES_EN.skills,
        study_experience: VERBIAGES_EN.study,
        work_experience: VERBIAGES_EN.work,
        style_switch_verbiage: [VERBIAGES_EN.styleSwitchVerbiages],
      };
      return makeSupabaseChain(map[table] ?? []);
    });
    render(<App />);
    // with no styles loaded, switchStyle should be a no-op — no throw
    await act(async () => {});
    expect(document.body.className).toBe('');
  });
});
