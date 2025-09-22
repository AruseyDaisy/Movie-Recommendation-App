import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import movieReducer from './features/movies/movieSlice';

const customRender = (
  ui,
  {
    preloadedState = {},
    store = configureStore({ 
      reducer: { movies: movieReducer }, 
      preloadedState 
    }),
    ...renderOptions
  } = {}
) => {
  const theme = createTheme();
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {children}
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };