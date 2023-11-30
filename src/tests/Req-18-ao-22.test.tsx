import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

describe('Testes da Página de Receitas', async () => {
  it('deve renderizar a página de Receitas com filtros e cards de receitas', () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();

    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
  });

  it('deve trocar a categoria e atualizar os cards correspondentes', async () => {
    renderWithRouterAndRedux(<App />, '/meals');
    expect(await screen.findByTestId('0-card-img')).toBeInTheDocument();
    expect(await screen.findByTestId('0-card-name')).toHaveTextContent('Corba');
    expect(await screen.findByTestId('11-card-img')).toBeInTheDocument();
    expect(await screen.findByTestId('11-card-name')).toHaveTextContent('Koshari');
  });
});
