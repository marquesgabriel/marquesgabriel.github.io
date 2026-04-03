import React from 'react';
import { render, screen } from '@testing-library/react';
import { Timeline } from '../Timeline';
import { TimelineItem } from '../TimelineItem';

// ─── TimelineItem ──────────────────────────────────────────────────────────

describe('TimelineItem', () => {
  const workItem = {
    _id: '1',
    title: 'Acme Corp',
    subTitle: 'Software Engineer',
    location: 'Remote',
    startDate: '2021-01-01',
    endDate: '2023-06-01',
    description: 'Built things',
  };

  it('renders title and subtitle', () => {
    render(<TimelineItem item={workItem} />);
    expect(screen.getByText(/Acme Corp/)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
  });

  it('renders date range with default format', () => {
    render(<TimelineItem item={workItem} />);
    expect(screen.getByText(/Jan 2021/)).toBeInTheDocument();
    expect(screen.getByText(/Jun 2023/)).toBeInTheDocument();
  });

  it('renders date range with custom dateFormat', () => {
    render(<TimelineItem item={workItem} dateFormat="YYYY" />);
    expect(screen.getByText(/2021/)).toBeInTheDocument();
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });

  it('renders "today" when endDate is null', () => {
    render(<TimelineItem item={{ ...workItem, endDate: null }} />);
    expect(screen.getByText(/today/)).toBeInTheDocument();
  });

  it('renders description as text when string', () => {
    render(<TimelineItem item={workItem} />);
    expect(screen.getByText('Built things')).toBeInTheDocument();
  });

  it('renders description as list items when array', () => {
    render(<TimelineItem item={{ ...workItem, description: ['Task A', 'Task B'] }} />);
    expect(screen.getByText('Task A')).toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
  });

  it('renders nothing for description when null/undefined', () => {
    const { container } = render(<TimelineItem item={{ ...workItem, description: null }} />);
    const desc = container.querySelector('.description');
    expect(desc?.querySelector('ul')).toBeNull();
  });

  it('renders location in date-range', () => {
    render(<TimelineItem item={workItem} />);
    expect(screen.getByText(/Remote/)).toBeInTheDocument();
  });

  it('renders course instead of location for study items', () => {
    const studyItem = {
      _id: '2',
      title: 'University',
      course: 'Computer Science',
      startDate: '2016-01-01',
      endDate: '2020-12-01',
      description: null,
    };
    render(<TimelineItem item={studyItem} />);
    expect(screen.getByText(/Computer Science/)).toBeInTheDocument();
  });
});

// ─── Timeline ──────────────────────────────────────────────────────────────

describe('Timeline', () => {
  const items = [
    {
      _id: '1',
      title: 'Job A',
      subTitle: '',
      location: 'NYC',
      startDate: '2020-01-01',
      endDate: '2021-01-01',
      description: null,
    },
    {
      _id: '2',
      title: 'Job B',
      subTitle: '',
      location: 'LA',
      startDate: '2022-01-01',
      endDate: null,
      description: null,
    },
    {
      _id: '3',
      title: 'Job C',
      subTitle: '',
      location: 'SF',
      startDate: '2019-01-01',
      endDate: '2020-01-01',
      description: null,
    },
  ];

  it('renders all items', () => {
    render(<Timeline list={items} sortingProp="startDate" />);
    expect(screen.getByText(/Job A/)).toBeInTheDocument();
    expect(screen.getByText(/Job B/)).toBeInTheDocument();
    expect(screen.getByText(/Job C/)).toBeInTheDocument();
  });

  it('sorts DESC by default (most recent first)', () => {
    const { getAllByText } = render(<Timeline list={items} sortingProp="startDate" />);
    const titles = document.querySelectorAll('.timeline-item .title');
    expect(titles[0].textContent).toContain('Job B'); // 2022
    expect(titles[1].textContent).toContain('Job A'); // 2020
    expect(titles[2].textContent).toContain('Job C'); // 2019
  });

  it('sorts ASC when direction="ASC"', () => {
    render(<Timeline list={[...items]} sortingProp="startDate" direction="ASC" />);
    const titles = document.querySelectorAll('.timeline-item .title');
    expect(titles[0].textContent).toContain('Job C'); // 2019
    expect(titles[1].textContent).toContain('Job A'); // 2020
    expect(titles[2].textContent).toContain('Job B'); // 2022
  });
});
