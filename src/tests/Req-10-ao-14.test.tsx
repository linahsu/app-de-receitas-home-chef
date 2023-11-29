import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

const user = userEvent.setup();

const ai = 'search-top-btn';
const ui = 'search-input';
const ayaya = 'ingredient-search-radio';
const ei = 'name-search-radio';
const oi = 'first-letter-search-radio';

describe('Teste o componente Search Bar - Requisitos 10 ao 14', () => {
  it('Testa se a barra de pesquisa, os radio buttons e o botão Search são renderizados na página', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId(ai);
    await user.click(searchTopBtn);

    expect(screen.getByTestId(ui)).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId(ayaya);
    const nameRadio = screen.getByTestId(ei);
    const firstLetterRadio = screen.getByTestId(oi);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('Testa se os radio buttons selecionam apenas um deles ao serem clicados', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId(ai);
    await user.click(searchTopBtn);

    const ingredientRadio = screen.getByTestId(ayaya);
    const nameRadio = screen.getByTestId(ei);
    const firstLetterRadio = screen.getByTestId(oi);

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

  /* it('Testa se a barra de pesquisa, os radio buttons e o botão Search estão funcionando', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId(ai);
    await user.click(searchTopBtn);

    expect(screen.getByTestId(ui)).toBeInTheDocument();

    await user.type(screen.getByTestId(ui), 'arrabiata');

    expect(screen.getByTestId(ui)).toHaveValue('arrabiata');

    const nameRadio = screen.getByTestId(ei);
    expect(nameRadio).toBeInTheDocument();
    expect(nameRadio).not.toBeChecked();

    await user.click(nameRadio);

    expect(nameRadio).toBeChecked();

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Search' }));
  }); */
});
