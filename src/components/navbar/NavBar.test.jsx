import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';

// Mock react-router-dom Link and useNavigate
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});
const router = require('react-router-dom');

const { defaultAuthMock } = require('../../test-utils');
const mockLogout = jest.fn();
const mockAuthContext = { ...defaultAuthMock, logout: mockLogout };

import NavBar from './NavBar';

// tests will use render from test-utils which wraps with AuthContext and BrowserRouter

describe('NavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows Login when user is not authenticated', () => {
    render(React.createElement(NavBar));
    const loginButton = screen.getByRole('link', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('shows user email and Logout when user is authenticated', () => {
    // update mock to simulate logged-in user
  const { AuthContext } = require('../../contexts/AuthContext');
    const value = { ...mockAuthContext, user: { email: 'test@example.com' } };

  render(React.createElement(NavBar), { providerValue: value });

    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('clicking Logout calls logout and navigates to /login', async () => {
    const navigateMock = jest.fn();
    router.useNavigate.mockReturnValue(navigateMock);

    // render with logged-in user
    const { AuthContext } = require('../../contexts/AuthContext');
    const value = { ...mockAuthContext, user: { email: 'me@me.com' } };

  render(React.createElement(NavBar), { providerValue: value });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();

    // wait for navigation to be called after the async logout
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });
});
