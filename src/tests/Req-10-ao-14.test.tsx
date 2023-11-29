import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

const user = userEvent.setup();

describe('Teste o componente Search Bar - Requisitos 10 ao 14', () => {
  it('Testa se a barra de pesquisa, os radio buttons e o botão Search são renderizados na página', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    await user.click(searchTopBtn);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('Testa se os radio buttons selecionam apenas um deles ao serem clicados', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    await user.click(searchTopBtn);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    await user.click(ingredientRadio);

    expect(ingredientRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    await user.click(nameRadio);

    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    await user.click(firstLetterRadio);

    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).toBeChecked();
  });
});
