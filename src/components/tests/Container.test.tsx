import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from '../Container';

describe('Container', () => {
  const baseProps = {
    activeStyle: 'flat',
    classes: 'test-class',
    title: 'Test Title',
    children: <span>child content</span>,
  };

  it('renders title text', () => {
    render(<Container {...baseProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Container {...baseProps} />);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('applies classes to wrapper', () => {
    const { container } = render(<Container {...baseProps} />);
    expect(container.firstChild).toHaveClass('container-wrapper', 'test-class');
  });

  it('does not render win98 buttons when activeStyle is not win98', () => {
    const { container } = render(<Container {...baseProps} />);
    expect(container.querySelector('.close-btn')).toBeNull();
    expect(container.querySelector('.minimize-btn')).toBeNull();
    expect(container.querySelector('.maximize-btn')).toBeNull();
  });

  describe('win98 style', () => {
    it('renders all three buttons by default (full barButtons)', () => {
      const { container } = render(<Container {...baseProps} activeStyle="win98" />);
      expect(container.querySelector('.minimize-btn')).toBeInTheDocument();
      expect(container.querySelector('.maximize-btn')).toBeInTheDocument();
      expect(container.querySelector('.close-btn')).toBeInTheDocument();
    });

    it('renders only close button when barButtons="close-only"', () => {
      const { container } = render(<Container {...baseProps} activeStyle="win98" barButtons="close-only" />);
      expect(container.querySelector('.close-btn')).toBeInTheDocument();
      expect(container.querySelector('.minimize-btn')).toBeNull();
      expect(container.querySelector('.maximize-btn')).toBeNull();
    });
  });
});
