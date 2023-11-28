import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

const emailBase = 'fabiolessa@gmail.com';
const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const buttonTestId = 'login-submit-btn';

describe('Teste o componente Login - Requisitos 2 ao 6', () => {
  it('Testa se a página contém dois inputs e um botão', () => {
    renderWithRouterAndRedux(<App />);
    expect(window.location.pathname).toBe('/');
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByTestId(buttonTestId);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('Testa se é possível digitar nos inputs', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();
    await user.type(screen.getByTestId(emailTestId), emailBase);
    await user.type(screen.getByTestId(passwordTestId), '1234567');
    expect(screen.getByTestId('email-input')).toHaveValue(emailBase);
    expect(screen.getByTestId(passwordTestId)).toHaveValue('1234567');
  });
  it('Testa se o botão está desabilitado com email invalido', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();
    expect(window.location.pathname).toBe('/');
    await user.type(screen.getByTestId(emailTestId), 'fabiolessa');
    await user.type(screen.getByTestId(passwordTestId), '1234567');
    const submitButton = screen.getByTestId(buttonTestId);
    expect(submitButton).toBeDisabled();
  });
  it('Testa se o botão será habilitado com dados válidos e se muda a rota para MEALS', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();
    expect(window.location.pathname).toBe('/');
    await user.type(screen.getByTestId(emailTestId), emailBase);
    await user.type(screen.getByTestId(passwordTestId), '1234567');
    const submitButton = screen.getByTestId(buttonTestId);
    expect(submitButton).toBeEnabled();
    await user.click(submitButton);
    const meals = screen.getByText(/Meals/i);
    expect(meals).toBeInTheDocument();
  });
});
