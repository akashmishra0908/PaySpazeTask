import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PaymentForm from "./PaymentForm"


jest.mock('axios');

describe('PaymentForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays success dialog on successful payment', async () => {

    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<PaymentForm />);

    fireEvent.click(screen.getByText('Make Payment'));

    fireEvent.change(screen.getByLabelText('To (Email)'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('From'), { target: { value: 'BTC' } });


    fireEvent.click(screen.getByText('Pay Now'));

    await waitFor(() => expect(screen.getByText('Payment Successful!')).toBeInTheDocument());
  });

  it('displays error message on 400 Bad Request', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 400 } });

    render(<PaymentForm />);

    fireEvent.click(screen.getByText('Make Payment'));
    fireEvent.change(screen.getByLabelText('To (Email)'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('From'), { target: { value: 'BTC' } });
    fireEvent.click(screen.getByText('Pay Now'));

    await waitFor(() => expect(screen.getByText('Bad Request: Please check your input.')).toBeInTheDocument());
  });

  it('redirects to login on 401 Unauthorized', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 401 } });
    delete window.location;
    window.location = { href: '/' };

    render(<PaymentForm />);

    fireEvent.click(screen.getByText('Make Payment'));
    fireEvent.change(screen.getByLabelText('To (Email)'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('From'), { target: { value: 'BTC' } });
    fireEvent.click(screen.getByText('Pay Now'));

    await waitFor(() => expect(window.location.href).toBe('/'));
  });

  it('displays error message on server error', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 500 } });

    render(<PaymentForm />);

    fireEvent.click(screen.getByText('Make Payment'));
    fireEvent.change(screen.getByLabelText('To (Email)'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('From'), { target: { value: 'BTC' } });
    fireEvent.click(screen.getByText('Pay Now'));

    await waitFor(() => expect(screen.getByText('Server Error: Please try again later.')).toBeInTheDocument());
  });
});
