import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';
// import RecipeDetails from '../pages/RecipeDetails';
// import MOCK_ALL_DRINKS from './mocks/mockAllDrinks';
// import MOCK_ALL_MEALS from './mocks/mockAllMeals';

describe('Testa a página de detalhes de uma receita', () => {
  it('Testa se a página meals renderiza a receita correta', async () => {
    const MOCK_MEAL = {
      meals: [
        {
          idMeal: '53027',
          strMeal: 'Koshari',
          strIngredient1: 'Brown Lentils',
          strIngredient2: 'Rice',
          strIngredient3: 'Coriander',
          strIngredient4: 'Macaroni',
          strIngredient5: 'Chickpeas',
          strIngredient6: 'Onion',
          strIngredient7: 'Salt',
          strIngredient8: 'Vegetable Oil',
          strIngredient9: '',
          strIngredient10: '',
          strIngredient11: '',
          strIngredient12: '',
          strIngredient13: '',
          strIngredient14: '',
          strIngredient15: '',
          strIngredient16: '',
          strIngredient17: '',
          strIngredient18: '',
          strIngredient19: '',
          strIngredient20: '',
        },
      ],
    };
    const DATA_MOCK = {
      json: async () => MOCK_MEAL,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(DATA_MOCK);
    renderWithRouterAndRedux(<App />, '/meals/53027');
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle.innerHTML).toBe('Koshari');
    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toBeInTheDocument();
  });

  it('Testa se a página drinks renderiza a receita correta', async () => {
    const MOCK_DRINK = {
      drinks: [
        {
          idDrink: '17222',
          strDrink: 'A1',
          strIngredient1: 'Gin',
          strIngredient2: 'Grand Marnier',
          strIngredient3: 'Lemon Juice',
          strIngredient4: 'Grenadine',
          strIngredient5: null,
          strIngredient6: null,
          strIngredient7: null,
          strIngredient8: null,
          strIngredient9: null,
          strIngredient10: null,
          strIngredient11: null,
          strIngredient12: null,
          strIngredient13: null,
          strIngredient14: null,
          strIngredient15: null,
        },
      ],
    };
    const DATA_MOCK = {
      json: async () => MOCK_DRINK,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(DATA_MOCK);
    renderWithRouterAndRedux(<App />, '/drinks/17222');
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toBeInTheDocument();
  });

  // it('Testa se Recipe Details renderiza o children', async () => {
  //   renderWithRouterAndRedux(<RecipeDetails>children</RecipeDetails>);
  //   expect(screen.getByText('children')).toBeInTheDocument();
  // });
});

// const mockAllDrinks = () => Promise.resolve({
//   status: 200,
//   ok: true,
//   json: () => {
//     return Promise.resolve({ drinks: MOCK_ALL_DRINKS.drinks });
//   },
// });

// describe('Testa as Recommendations na tela de Drinks', () => {
//   beforeEach(() => {
//     global.fetch = vi.fn(mockAllDrinks) as any;
//   });
//   it('Testa se tem 6 recomendações de comidas na pagina do Drink ', async () => {
//     renderWithRouterAndRedux(<App />, '/drinks/17222');
//     const recomendations = await screen.findAllByTestId(/-recommendation-card/);
//     expect(recomendations.length).toBe(6);
//   });
//   // it('Testa se as recomendações de bebidas são renderizadas corretamente', async () => {});
//   // it('Testa se as recomendações de bebidas são renderizadas corretamente', async () => {});
// });

// describe('Testa as Recommendations na tela de Meals', () => {
//   beforeEach(() => {
//     const DATA_MOCK = {
//       json: async () => MOCK_ALL_MEALS,
//     } as Response;
//     vi.spyOn(global, 'fetch').mockResolvedValueOnce(DATA_MOCK);
//   });
//   it('Testa se as recomendações de bebidas são renderizadas corretamente', async () => {});
//   it('Testa se as recomendações de bebidas são renderizadas corretamente', async () => {});
//   it('Testa se as recomendações de bebidas são renderizadas corretamente', async () => {});
// });
