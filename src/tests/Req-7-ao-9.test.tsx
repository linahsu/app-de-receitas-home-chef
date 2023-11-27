import { screen } from '@testing-library/dom';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Teste o componente Header - Requisitos 7 ao 9', () => {
  it('Testa se o componente contém ícone de perfil, o ícone de busca e o título da página', () => {
    renderWithRouter(<App />, { route: '/meals' });

    expect(window.location.pathname).toBe('/meals');

    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('Testa se ao clicar no ícone de perfil, a página é redirecionada para a página Profile e o título muda para "Profile"', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    expect(window.location.pathname).toBe('/meals');

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    await user.click(profileTopBtn);

    expect(window.location.pathname).toBe('/profile');
    expect(screen.getByTestId('page-title')).toHaveTextContent('Profile');
  });

  it('Testa se ao clicar no ícone de busca, o campo de busca aparece, ao clicar novamente o campo de busca desaparece', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    await user.click(searchTopBtn);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    await user.click(searchTopBtn);

    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });
});
