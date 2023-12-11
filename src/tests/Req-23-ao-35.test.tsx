import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';
// import RecipeDetails from '../pages/RecipeDetails';
// import MOCK_ALL_DRINKS from './mocks/mockAllDrinks';
// import MOCK_ALL_MEALS from './mocks/mockAllMeals';
import { fetchDetailMock, fetchMock } from './mocks/fetchMock';
import mockLocalStorage from './mocks/mockLocalStorage';
import { SHAKSHUKA_MEAL } from './mocks/mockMealDetail';
import { A1_DRINK } from './mocks/mockDrinkDetail';

const user = userEvent.setup();

const mealDetailPath = '/meals/52771';
const drinkDetailPath = '/drinks/718319';
const mealDetailPath2 = '/meals/52963';
const drinkDetailPath2 = '/drinks/17222';

const whiteHeartIcon = '/src/images/whiteHeartIcon.svg';
const blackHeartIcon = '/src/images/blackHeartIcon.svg';

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
    renderWithRouterAndRedux(<App />, drinkDetailPath2);
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
//     renderWithRouterAndRedux(<App />, drinkDetailPath2);
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

const mockedLocalStorage = {
  doneRecipes: [
    {
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: null,
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      doneDate: '04-12-2023',
      tags: ['soup'],
    },
    {
      id: '17222',
      type: 'drink',
      nationality: null,
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'A1',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      doneDate: '03-12-2023',
      tags: null,
    },
  ],

  inProgressRecipes: {
    drinks: {
      15997: [],
    },
    meals: {
      53065: [],
    },
  },
};

describe('Testes do botão "Start/Continue Recipe"', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockedLocalStorage.doneRecipes));
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockedLocalStorage.inProgressRecipes));
  });

  const btnTestId = 'start-recipe-btn';

  it('Testa se o botão está disponível com o texto "Start Recipe" para receitas nunca feitas', async () => {
    renderWithRouterAndRedux(<App />, '/meals/53060');

    const startRecipeBtn = await screen.findByTestId(btnTestId);

    expect(startRecipeBtn).toHaveTextContent(/Start Recipe/i);
  });

  it('Testa se o botão está disponível com o texto "Continue Recipe" para bebidas em progresso', async () => {
    renderWithRouterAndRedux(<App />, '/drinks/15997');

    const startRecipeBtn = await screen.findByTestId(btnTestId);

    expect(startRecipeBtn).toHaveTextContent(/Continue Recipe/i);
  });

  it('Testa se o botão está disponível com o texto "Continue Recipe" para comidas em progresso', async () => {
    renderWithRouterAndRedux(<App />, '/meals/53065');

    const startRecipeBtn = await screen.findByTestId(btnTestId);

    expect(startRecipeBtn).toHaveTextContent(/Continue Recipe/i);
  });

  it('Testa o clique no botão "Start Recipe" numa página de comida', async () => {
    renderWithRouterAndRedux(<App />, '/meals/53060');

    const startRecipeBtn = await screen.findByTestId(btnTestId);

    await user.click(startRecipeBtn);
  });

  it('Testa o clique no botão "Start Recipe" numa página de bebida', async () => {
    renderWithRouterAndRedux(<App />, '/drinks/17141');

    const startRecipeBtn = await screen.findByTestId(btnTestId);

    await user.click(startRecipeBtn);
  });
});

describe('Testa o botão de compartilhamento', () => {
  it('Testa se ao clicar no shareBtn, o texto "Link copied!" aparece na tela no componente MealDetail', async () => {
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

    const mealShareBtn = await screen.findByTestId(/share-btn/i);

    expect(mealShareBtn).toBeInTheDocument();

    await user.click(mealShareBtn);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe('http://localhost:3000/meals/53027');
  });

  it('Testa se ao clicar no shareBtn, o texto "Link copied!" aparece na tela no componente DrinkDetail', async () => {
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
    renderWithRouterAndRedux(<App />, drinkDetailPath2);

    const mealShareBtn = await screen.findByTestId(/share-btn/i);

    expect(mealShareBtn).toBeInTheDocument();

    await user.click(mealShareBtn);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe('http://localhost:3000/drinks/17222');
  });
});

describe('Testa a função handleFvoriteBtn quando recebe uma receita com chaves vazias', () => {
  it('Testa a função handleFavoriteBtn no componente MealDetail', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => SHAKSHUKA_MEAL,
    } as Response);

    renderWithRouterAndRedux(<App />, mealDetailPath2);

    const mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', blackHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Testa a função handleFavoriteBtn no componente DrinkDetail', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => A1_DRINK,
    } as Response);

    renderWithRouterAndRedux(<App />, drinkDetailPath2);

    const mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', blackHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });
});

describe.only('Testa o botão de favoritar', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(fetchDetailMock as any);
  });

  it('Testa se ao clicar no favoriteBtn, o ícone muda no componente MealDetail', async () => {
    renderWithRouterAndRedux(<App />, mealDetailPath);

    const mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);

    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', blackHeartIcon);
    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Testa se ao clicar no favoriteBtn, o ícone muda no componente DrinkDetail', async () => {
    renderWithRouterAndRedux(<App />, drinkDetailPath);

    const drinkFavoriteBtn = await screen.findByTestId(/favorite-btn/i);

    expect(drinkFavoriteBtn).toBeInTheDocument();
    expect(drinkFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    await user.click(drinkFavoriteBtn);
    expect(drinkFavoriteBtn).toHaveAttribute('src', blackHeartIcon);
    await user.click(drinkFavoriteBtn);
    expect(drinkFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Testa se o ícone muda se a receita estiver no favoriteRecipes ou não no LocalStorage no componente MealDetail', async () => {
    mockLocalStorage();
    renderWithRouterAndRedux(<App />, mealDetailPath);

    let mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);

    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealFavoriteBtn).toHaveAttribute('src', blackHeartIcon);

    await user.click(mealFavoriteBtn);
    mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Testa se o ícone é o blackHeartIcon se a receita estiver no favoriteRecipes no LocalStorage no componente DrinkDetail', async () => {
    mockLocalStorage();
    renderWithRouterAndRedux(<App />, drinkDetailPath);

    let drinkFavoriteBtn = await screen.findByTestId(/favorite-btn/i);

    expect(drinkFavoriteBtn).toBeInTheDocument();
    expect(drinkFavoriteBtn).toHaveAttribute('src', blackHeartIcon);

    await user.click(drinkFavoriteBtn);
    drinkFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(drinkFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });
});
