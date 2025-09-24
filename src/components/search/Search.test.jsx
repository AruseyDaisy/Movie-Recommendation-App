import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import Search from './Search';

// Mock searchMovies service
jest.mock('../../services/movieService', () => ({
  searchMovies: jest.fn(),
}));

// Mock MovieCard to avoid rendering MUI complexities
jest.mock('../moviecard/MovieCard', () => {
  const React = require('react');
  return (props) => {
    const { movie } = props;
    return React.createElement('div', { 'data-testid': `movie-${movie.id}` }, movie.title || movie.name || 'movie');
  };
});

import { searchMovies } from '../../services/movieService';

describe('Search component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders search UI', () => {
    render(<Search />);
    expect(screen.getByLabelText(/Search by title or keyword/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('shows results when searchMovies returns data', async () => {
    const fakeResults = { results: [{ id: 1, title: 'Movie A' }, { id: 2, title: 'Movie B' }] };
    searchMovies.mockResolvedValueOnce(fakeResults);

    render(<Search />);

    const input = screen.getByLabelText(/Search by title or keyword/i);
    fireEvent.change(input, { target: { value: 'term' } });

    // advance debounce timer
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(searchMovies).toHaveBeenCalledWith('term');
    });

    // movie items should be present
    expect(screen.getByTestId('movie-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-2')).toBeInTheDocument();
  });

  test('shows no results message when search returns empty', async () => {
    searchMovies.mockResolvedValueOnce({ results: [] });

    render(<Search />);

    const input = screen.getByLabelText(/Search by title or keyword/i);
    fireEvent.change(input, { target: { value: 'nope' } });
    jest.advanceTimersByTime(500);

    await waitFor(() => expect(searchMovies).toHaveBeenCalledWith('nope'));

    expect(screen.getByText(/No results for/i)).toBeInTheDocument();
  });

  test('shows error message on search failure', async () => {
    searchMovies.mockRejectedValueOnce(new Error('fail'));

    render(<Search />);

    const input = screen.getByLabelText(/Search by title or keyword/i);
    fireEvent.change(input, { target: { value: 'err' } });
    jest.advanceTimersByTime(500);

    await waitFor(() => expect(searchMovies).toHaveBeenCalledWith('err'));

    expect(screen.getByText(/Failed to search/i)).toBeInTheDocument();
  });
});
