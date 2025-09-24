// src/components/Footer/Footer.test.js
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';

describe('Footer Component', () => {
  test('renders footer with correct content', () => {
    render(<Footer />);
    
    // Check if the footer text is rendered
    const footerText = screen.getByText(/Movie Recommender. Built with ❤️ using React & TMDB API./i);
    expect(footerText).toBeInTheDocument();
  });

  test('displays the current year', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    const yearRegex = new RegExp(`© ${currentYear} Movie Recommender`);
    
    const yearElement = screen.getByText(yearRegex);
    expect(yearElement).toBeInTheDocument();
  });

  test('has the correct container with maxWidth lg', () => {
    const { container } = render(<Footer />);
    
    // Check if the Container component with maxWidth="lg" is present
    const containerElement = container.querySelector('.MuiContainer-maxWidthLg');
    expect(containerElement).toBeInTheDocument();
  });

  test('has the correct typography variant and alignment', () => {
    const { container } = render(<Footer />);
    
    // Check if the Typography component with body2 variant and center alignment is present
    const typographyElement = container.querySelector('.MuiTypography-body2');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement).toHaveClass('MuiTypography-alignCenter');
  });

  test('has the footer class applied', () => {
    const { container } = render(<Footer />);
    
    // Check if the footer element has the correct class
    const footerElement = container.querySelector('footer.footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});