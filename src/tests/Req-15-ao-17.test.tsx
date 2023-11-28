import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

describe('Teste o componente Footer - Requisitos 15-17', () => {
  it('Testa se existe um rodapé fixo na página de receitas de comida', () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Testa se existe um rodapé fixo na página de receitas de bebida', () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    expect(window.location.pathname).toBe('/drinks');

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Testa se existe um rodapé fixo na página de perfil', () => {
    renderWithRouterAndRedux(<App />, '/profile');

    expect(window.location.pathname).toBe('/profile');

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Testa se o botão do rodapé redireciona à página de bebidas', async () => {
    renderWithRouterAndRedux(<App />, '/profile');

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    await userEvent.click(drinksBtn);
    expect(window.location.pathname).toBe('/drinks');
  });

  it('Testa se o botão do rodapé redireciona à página de comidas', async () => {
    renderWithRouterAndRedux(<App />, '/profile');

    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    await userEvent.click(mealsBtn);
    expect(window.location.pathname).toBe('/meals');
  });
});
