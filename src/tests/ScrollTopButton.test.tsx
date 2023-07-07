import { render, screen } from '@testing-library/react';
import { ScrollTopButton } from '../components/ScrollTopButton';

describe('ScrollTopButton', () => {

  beforeEach(() => {
    render(<ScrollTopButton scrollToSection={() => {}} />);
  });

  test('should be defined', () => {
    expect(screen.getByText('Scroll to top')).toBeDefined();
  });
  
});