import { userEvent } from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';

const user = userEvent.setup();

describe('Teste a página Profile - Req. 51 ao 61', () => {
  it('Testa se a página de perfil mostra na tela o email usado no login e 3 botões (Done Recipes, Favorite Recipes e Logout)', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');

    const USER_EMAIL = 'grupo3@trybe.com';
    await user.type(emailInput, USER_EMAIL);
    await user.type(passwordInput, '1234567');
    await user.click(submitBtn);

    const profileBtn = screen.getByTestId('profile-top-btn');
    await user.click(profileBtn);

    const emailDisplay = screen.getByText(USER_EMAIL);
    expect(emailDisplay).toBeInTheDocument();

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    const favRecipesBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('O botão "Done Recipes" redireciona para a rota correta', async () => {
    renderWithRouterAndRedux(<App />, '/profile');

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    await user.click(doneRecipesBtn);

    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('O botão "Favorite Recipes" redireciona para a rota correta', async () => {
    renderWithRouterAndRedux(<App />, '/profile');

    const favRecipesBtn = screen.getByTestId('profile-favorite-btn');
    await user.click(favRecipesBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('O botão "Logout" limpa o localStorage e volta para a página de login', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');

    const USER_EMAIL = 'grupo3@trybe.com';
    await user.type(emailInput, USER_EMAIL);
    await user.type(passwordInput, '1234567');
    await user.click(submitBtn);

    const profileBtn = screen.getByTestId('profile-top-btn');
    await user.click(profileBtn);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    await user.click(logoutBtn);

    expect(Object.keys(localStorage).length).toEqual(0);
  });
});
