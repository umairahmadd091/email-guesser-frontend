import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getEmail } from '../../api/api';
import App from '../app/App';

// Mock the API call
jest.mock('../../api/api', () => ({
  getEmail: jest.fn(),
}));

describe('Email Guesser App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render input fields and submit button', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Domain Name')).toBeInTheDocument();
    expect(screen.getByText('Guess Email')).toBeInTheDocument();
  });

  it('should display derived email on successful API call', async () => {
    (getEmail as jest.Mock).mockResolvedValueOnce({ data: { email: 'jdoe@babbel.com' } });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Domain Name'), { target: { value: 'babbel.com' } });
    fireEvent.click(screen.getByText('Guess Email'));

    await waitFor(() => expect(getEmail).toHaveBeenCalledWith({ fullName: 'John Doe', domain: 'babbel.com' }));
    expect(screen.getByText('Derived Email: jdoe@babbel.com')).toBeInTheDocument();
  });

  it('should display error message when API call fails', async () => {
    (getEmail as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Domain Name'), { target: { value: 'example.com' } });
    fireEvent.click(screen.getByText('Guess Email'));

    await waitFor(() => expect(getEmail).toHaveBeenCalledWith({ fullName: 'John Doe', domain: 'example.com' }));
    expect(screen.getByText('Email could not be derived')).toBeInTheDocument();
  });
});
