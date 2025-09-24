import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

// default mock auth context value used by tests
export const defaultAuthMock = {
  user: null,
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

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };