import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Prevent the real AuthProvider from running firebase listeners during tests
jest.mock('./contexts/AuthContext', () => {
  const React = require('react');
  const defaultValue = {
    user: null,
    loadingAuthState: false,
    authError: null,
    signup: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  };

  const AuthContext = React.createContext(defaultValue);

  const AuthProvider = ({ children }) => (
    React.createElement(AuthContext.Provider, { value: defaultValue }, children)
  );

  return { AuthContext, AuthProvider };
});

test('renders app title', () => {
  render(<App />);
  // header title is rendered as a link; target the link role to avoid the footer text
  const titleLink = screen.getByRole('link', { name: /Movie Recommender/i });
  expect(titleLink).toBeInTheDocument();
});
