// src/test-utils.js
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

// Mock Firebase to prevent initialization errors during tests
jest.mock('./firebase/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: jest.fn((callback) => {
      // Simulate no user initially
      callback(null);
      // Return unsubscribe function
      return jest.fn();
    }),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: null })),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: null })),
    signOut: jest.fn(() => Promise.resolve()),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  }
}));

// Also mock the firebase auth module directly
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
    onAuthStateChanged: jest.fn((callback) => {
      callback(null);
      return jest.fn();
    }),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: null })),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: null })),
    signOut: jest.fn(() => Promise.resolve()),
  })),
  setPersistence: jest.fn(() => Promise.resolve()),
  browserLocalPersistence: {},
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApp: jest.fn(),
}));

// default mock auth context value used by tests
const defaultAuthMock = {
  user: null,
  loadingAuthState: false,
  authError: null,
  signup: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
};

// Mock user for authenticated tests
const authenticatedAuthMock = {
  user: {
    uid: 'test-uid-123',
    email: 'test@example.com',
    displayName: 'Test User',
  },
  loadingAuthState: false,
  authError: null,
  signup: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
};

const customRender = (
  ui,
  {
    providerValue = defaultAuthMock,
    route = '/',
    ...renderOptions
  } = {}
) => {
  const theme = createTheme();
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Helper function for rendering with authenticated user
const renderWithAuth = (
  ui,
  {
    user = authenticatedAuthMock.user,
    route = '/',
    ...renderOptions
  } = {}
) => {
  const authMock = {
    ...authenticatedAuthMock,
    user: user,
  };

  return customRender(ui, { providerValue: authMock, route, ...renderOptions });
};

// Helper function for rendering with loading state
const renderWithLoading = (
  ui,
  {
    route = '/',
    ...renderOptions
  } = {}
) => {
  const loadingAuthMock = {
    ...defaultAuthMock,
    loadingAuthState: true,
  };

  return customRender(ui, { providerValue: loadingAuthMock, route, ...renderOptions });
};

// Helper function for rendering with error state
const renderWithAuthError = (
  ui,
  {
    error = 'Authentication failed',
    route = '/',
    ...renderOptions
  } = {}
) => {
  const errorAuthMock = {
    ...defaultAuthMock,
    authError: error,
  };

  return customRender(ui, { providerValue: errorAuthMock, route, ...renderOptions });
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method and export helpers
export { 
  customRender as render, 
  renderWithAuth, 
  renderWithLoading, 
  renderWithAuthError 
};