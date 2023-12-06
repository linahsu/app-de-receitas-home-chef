import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';

const user = userEvent.setup();

function mockLocalStoarge() {
  const mockDoneRecipes = [
    {
      id: '52839',
      type: 'meal',
      nationality: 'Italian',
      category: 'Pasta',
      alcoholicOrNot: undefined,
      name: 'Chilli prawn linguine',
      image: 'https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg',
      doneDate: '27-03-2023',
      tags: [],
    },
    {
      id: '52857',
      type: 'meal',
      nationality: 'American',
      category: 'Dessert',
      alcoholicOrNot: undefined,
      name: 'Pumpkin Pie',
      image: 'https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg',
      doneDate: '28-03-2023',
      tags: ['Halloween', 'Pie', 'Desert'],
    },
    {
      id: '11157',
      type: 'drink',
      nationality: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Alcoholic',
      name: 'Brandy Cobbler',
      image: 'https://www.thecocktaildb.com/images/media/drink/5xgu591582580586.jpg',
      doneDate: '29-03-2023',
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
}

const doneRecipesPath = '/done-recipes';

beforeEach(() => mockLocalStoarge());

describe('Testa página de DoneRecipes - Req. 43 ao 48', () => {
  it('Testa se a página DoneRecipes possui três botões e filtro e uma lista de receitas', () => {
    renderWithRouterAndRedux(<App />, doneRecipesPath);

    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    const mealFilterBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    const doneRecipeList = screen.getByTestId('done-recipes-list');

    expect(allFilterBtn).toBeInTheDocument();
    expect(mealFilterBtn).toBeInTheDocument();
    expect(drinkFilterBtn).toBeInTheDocument();
    expect(doneRecipeList).toBeInTheDocument();
  });

  it('Testa se os botões de filtro funcionam corretamente', async () => {
    renderWithRouterAndRedux(<App />, doneRecipesPath);

    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    const mealFilterBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    const RENDERED_RECIPE_TESTID = 'rendered-done-recipe';

    await user.click(mealFilterBtn);

    const renderedRecipes1 = screen.getAllByTestId(RENDERED_RECIPE_TESTID);
    expect(renderedRecipes1).toHaveLength(2);

    await user.click(drinkFilterBtn);

    const renderedRecipes2 = screen.getAllByTestId(RENDERED_RECIPE_TESTID);
    expect(renderedRecipes2).toHaveLength(1);

    await user.click(allFilterBtn);

    const renderedRecipes3 = screen.getAllByTestId(RENDERED_RECIPE_TESTID);
    expect(renderedRecipes3).toHaveLength(3);
  });

  it('Testa se o gerador de imagem e título funciona corretamente; com a navegação', async () => {
    renderWithRouterAndRedux(<App />, doneRecipesPath);

    const secondImg = screen.getByTestId('1-horizontal-image');
    const secondHeader = screen.getByTestId('1-horizontal-name');

    expect(secondImg).toBeInTheDocument();
    expect(secondHeader).toBeInTheDocument();

    await user.click(secondImg);

    expect(window.location.pathname).toBe('/meals/52857');
  });

  it('Testa se o botão Share copia corretamente a URL para a área de transferência', async () => {
    renderWithRouterAndRedux(<App />, doneRecipesPath);

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const COPIED_VALUE = 'http://localhost:3000/meals/52839';

    await user.click(shareBtn);
    const copiedMsg = screen.getByTestId('horizontal-copied-msg');

    expect(await navigator.clipboard.readText()).toBe(COPIED_VALUE);
    expect(copiedMsg).toBeInTheDocument();
  });
});
