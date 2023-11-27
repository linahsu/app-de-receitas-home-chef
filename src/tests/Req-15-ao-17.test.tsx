import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Teste o componente Footer - Requisitos 15-17', () => {
  it('Testa se existe um rodapé fixo na página de receitas de comida', () => {
    renderWithRouter(<App />, { route: '/meals' });

    expect(window.location.pathname).toBe('/meals');

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Testa se existe um rodapé fixo na página de receitas de bebida', () => {
    renderWithRouter(<App />, { route: '/drinks' });

    expect(window.location.pathname).toBe('/drinks');

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Testa se existe um rodapé fixo na página de perfil', () => {
    renderWithRouter(<App />, { route: '/profile' });

    expect(window.location.pathname).toBe('/profile');

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Testa se o botão do rodapé redireciona à página de bebidas', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    await userEvent.click(drinksBtn);
    expect(window.location.pathname).toBe('/drinks');
  });

  it('Testa se o botão do rodapé redireciona à página de comidas', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    await userEvent.click(mealsBtn);
    expect(window.location.pathname).toBe('/meals');
  });
});
