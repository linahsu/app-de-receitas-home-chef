import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';
import { fetchDetailMock } from './mocks/fetchMock';
import mockLocalStorage from './mocks/mockLocalStorage';
import { SHAKSHUKA_MEAL } from './mocks/mockMealDetail';
import { A1_DRINK } from './mocks/mockDrinkDetail';

const mealInProgressPath = '/meals/52771/in-progress';
const drinkInProgressPath = '/drinks/718319/in-progress';
const mealInProgressPath2 = '/meals/52963/in-progress';
const drinkInProgressPath2 = '/drinks/17222/in-progress';

const mealEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=718319';

const whiteHeartIcon = '/src/images/whiteHeartIcon.svg';
const blackHeartIcon = '/src/images/blackHeartIcon.svg';

const doneRecipes = '/done-recipes';

const MockEmptyRecipe = {
  meals: { undefined },
  drinks: { undefined },
};

describe('Testa a renderização dos elemento e chamadas das APIs da página RecipeInProgress', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa se a página de meals contém os elementos esperados', async () => {
    renderWithRouterAndRedux(<App />, mealInProgressPath);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(mealEndpoint);

    const mealName = await screen.findByText(/Spicy Arrabiata Penne/i);
    const mealCategory = await screen.findByTestId(/recipe-category/i);
    const mealImage = await screen.findByTestId(/recipe-photo/i);
    const mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    const mealShareBtn = await screen.findByTestId(/share-btn/i);
    const mealInstructions = await screen.findByTestId(/instructions/i);
    const mealIngredients = await screen.findByTestId(/0-ingredient-step/i);
    const mealFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);

    expect(mealName).toBeInTheDocument();
    expect(mealCategory).toBeInTheDocument();
    expect(mealCategory).toHaveTextContent(/Vegetarian/i);
    expect(mealImage).toBeInTheDocument();
    expect(mealImage).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealShareBtn).toBeInTheDocument();
    expect(mealInstructions).toBeInTheDocument();
    expect(mealIngredients).toBeInTheDocument();
    expect(mealFinishBtn).toBeInTheDocument();
  });

  it('Testa se a página de drinks contém os elementos esperados', async () => {
    renderWithRouterAndRedux(<App />, drinkInProgressPath);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(drinkEndpoint);

    const drinkName = await screen.findByText(/Aquamarine/i);
    const drinkCategory = await screen.findByTestId(/recipe-category/i);
    const drinkImage = await screen.findByTestId(/recipe-photo/i);
    const drinkFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    const drinkShareBtn = await screen.findByTestId(/share-btn/i);
    const drinkInstructions = await screen.findByTestId(/instructions/i);
    const drinkIngredients = await screen.findByTestId(/0-ingredient-step/i);
    const drinkFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);

    expect(drinkName).toBeInTheDocument();
    expect(drinkCategory).toBeInTheDocument();
    expect(drinkCategory).toHaveTextContent(/Alcoholic/i);
    expect(drinkImage).toBeInTheDocument();
    expect(drinkImage).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(drinkFavoriteBtn).toBeInTheDocument();
    expect(drinkShareBtn).toBeInTheDocument();
    expect(drinkInstructions).toBeInTheDocument();
    expect(drinkIngredients).toBeInTheDocument();
    expect(drinkFinishBtn).toBeInTheDocument();
  });
});

describe('Testa se não renderiza nada se o retorno da API for undefined', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => MockEmptyRecipe,
    } as any);
  });

  it('Testa se a página de meals não contém os elementos esperados', () => {
    renderWithRouterAndRedux(<App />, mealInProgressPath);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(mealEndpoint);

    expect(screen.queryByText(/Spicy Arrabiata Penne/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/recipe-category/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/recipe-photo/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/favorite-btn/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/share-btn/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/instructions/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/0-ingredient-step/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/finish-recipe-btn/i)).not.toBeInTheDocument();
  });

  it('Testa se a página de drinks não contém os elementos esperados', () => {
    renderWithRouterAndRedux(<App />, drinkInProgressPath);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(drinkEndpoint);

    expect(screen.queryByText(/Spicy Arrabiata Penne/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/recipe-category/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/recipe-photo/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/favorite-btn/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/share-btn/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/instructions/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/0-ingredient-step/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/finish-recipe-btn/i)).not.toBeInTheDocument();
  });
});

describe('Testa as funções ingredientCheck e handleIngredientCheck', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa se ao clicar no checkbox, ele fica checked e vice e versa no componente MealInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, mealInProgressPath);

    let firstMealIngredient = (await screen.findAllByRole('checkbox'))[0];

    expect(firstMealIngredient).toBeInTheDocument();
    expect(firstMealIngredient).not.toBeChecked();

    await user.click(firstMealIngredient);
    [firstMealIngredient] = (await screen.findAllByRole('checkbox'));
    expect(firstMealIngredient).toBeChecked();

    await user.click(firstMealIngredient);
    [firstMealIngredient] = (await screen.findAllByRole('checkbox'));
    expect(firstMealIngredient).not.toBeChecked();
  });

  it('Testa se ao clicar no checkbox, ele fica checked e vice e versa no componente DrinkInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, drinkInProgressPath);

    let firstDrinkIngredient = (await screen.findAllByRole('checkbox'))[0];

    expect(firstDrinkIngredient).toBeInTheDocument();
    expect(firstDrinkIngredient).not.toBeChecked();

    await user.click(firstDrinkIngredient);
    [firstDrinkIngredient] = (await screen.findAllByRole('checkbox'));
    expect(firstDrinkIngredient).toBeChecked();

    await user.click(firstDrinkIngredient);
    [firstDrinkIngredient] = (await screen.findAllByRole('checkbox'));
    expect(firstDrinkIngredient).not.toBeChecked();
  });
});

describe('Testa a função handleFvoriteBtn quando recebe uma receita com chaves vazias', () => {
  it('Testa se o finishRecipeBtn fica habilitado após todos os ingredientes são checados, ao clicar no botão a página é redirecionada para a página DoneRecipes a receita é salva no LocalStorage no componente MealInProgress', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => SHAKSHUKA_MEAL,
    } as Response);

    const { user } = renderWithRouterAndRedux(<App />, mealInProgressPath2);

    const allIngredients = (await screen.findAllByRole('checkbox'));
    let mealFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);

    expect(allIngredients.length).toBe(9);
    expect(mealFinishBtn).toBeInTheDocument();
    expect(mealFinishBtn).toBeDisabled();

    await user.click(allIngredients[0]);
    await user.click(allIngredients[1]);
    await user.click(allIngredients[2]);
    await user.click(allIngredients[3]);
    await user.click(allIngredients[4]);
    await user.click(allIngredients[5]);
    await user.click(allIngredients[6]);
    await user.click(allIngredients[7]);
    await user.click(allIngredients[8]);

    mealFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);
    expect(mealFinishBtn).not.toBeDisabled();

    await user.click(mealFinishBtn);
    expect(window.location.pathname).toBe(doneRecipes);
    expect(screen.getByText(/Shakshuka/i)).toBeInTheDocument();
  });

  it(('Testa se ao entrar novamente na página RecipeInProgress, os checkboxs estão checados no componente MealsInProgress'), async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => SHAKSHUKA_MEAL,
    } as Response);

    renderWithRouterAndRedux(<App />, mealInProgressPath2);

    const allIngredients = (await screen.findAllByRole('checkbox'));
    expect(allIngredients.length).toBe(9);

    expect(allIngredients[0]).toBeChecked();
    expect(allIngredients[1]).toBeChecked();
    expect(allIngredients[2]).toBeChecked();
    expect(allIngredients[3]).toBeChecked();
    expect(allIngredients[4]).toBeChecked();
    expect(allIngredients[5]).toBeChecked();
    expect(allIngredients[6]).toBeChecked();
    expect(allIngredients[7]).toBeChecked();
    expect(allIngredients[8]).toBeChecked();
  });

  it('Testa se o finishRecipeBtn fica habilitado após todos os ingredientes são checados, ao clicar no botão a página é redirecionada para a página DoneRecipes a receita é salva no LocalStorage no componente DrinkInProgress', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => A1_DRINK,
    } as Response);

    const { user } = renderWithRouterAndRedux(<App />, drinkInProgressPath2);

    const allIngredients = (await screen.findAllByRole('checkbox'));
    let drinkFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);

    expect(allIngredients.length).toBe(4);
    expect(drinkFinishBtn).toBeInTheDocument();
    expect(drinkFinishBtn).toBeDisabled();

    await user.click(allIngredients[0]);
    await user.click(allIngredients[1]);
    await user.click(allIngredients[2]);
    await user.click(allIngredients[3]);

    drinkFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);
    expect(drinkFinishBtn).not.toBeDisabled();

    await user.click(drinkFinishBtn);
    expect(window.location.pathname).toBe(doneRecipes);
    expect(screen.getByText(/A1/i)).toBeInTheDocument();
  });

  it(('Testa se ao entrar novamente na página RecipeInProgress, os checkboxs estão checados no conponente DrinkInProgress'), async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => A1_DRINK,
    } as Response);

    renderWithRouterAndRedux(<App />, drinkInProgressPath2);

    const allIngredients = (await screen.findAllByRole('checkbox'));
    expect(allIngredients.length).toBe(4);

    expect(allIngredients[0]).toBeChecked();
    expect(allIngredients[1]).toBeChecked();
    expect(allIngredients[2]).toBeChecked();
    expect(allIngredients[3]).toBeChecked();
  });
});

describe('Testa a função handleFinishRecipeBtn e a chave inProgress do LocalStorage', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa se o finishRecipeBtn fica habilitado após todos os ingredientes são checados, ao clicar no botão a página é redirecionada para a página DoneRecipes a receita é salva no LocalStorage no componente MealInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, mealInProgressPath);

    const allIngredients = (await screen.findAllByRole('checkbox'));
    let mealFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);

    expect(allIngredients.length).toBe(8);
    expect(mealFinishBtn).toBeInTheDocument();
    expect(mealFinishBtn).toBeDisabled();

    await user.click(allIngredients[0]);
    await user.click(allIngredients[1]);
    await user.click(allIngredients[2]);
    await user.click(allIngredients[3]);
    await user.click(allIngredients[4]);
    await user.click(allIngredients[5]);
    await user.click(allIngredients[6]);
    await user.click(allIngredients[7]);

    mealFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);
    expect(mealFinishBtn).not.toBeDisabled();

    await user.click(mealFinishBtn);
    expect(window.location.pathname).toBe(doneRecipes);
    expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();
  });

  it(('Testa se ao entrar novamente na página RecipeInProgress, os checkboxs estão checados no componente MealsInProgress'), async () => {
    renderWithRouterAndRedux(<App />, mealInProgressPath);

    const allIngredients = (await screen.findAllByRole('checkbox'));
    expect(allIngredients.length).toBe(8);

    expect(allIngredients[0]).toBeChecked();
    expect(allIngredients[1]).toBeChecked();
    expect(allIngredients[2]).toBeChecked();
    expect(allIngredients[3]).toBeChecked();
    expect(allIngredients[4]).toBeChecked();
    expect(allIngredients[5]).toBeChecked();
    expect(allIngredients[6]).toBeChecked();
    expect(allIngredients[7]).toBeChecked();
  });

  it('Testa se o finishRecipeBtn fica habilitado após todos os ingredientes são checados, ao clicar no botão a página é redirecionada para a página DoneRecipes a receita é salva no LocalStorage no componente DrinkInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, drinkInProgressPath);

    const allIngredients = (await screen.findAllByRole('checkbox'));
    let drinkFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);

    expect(allIngredients.length).toBe(3);
    expect(drinkFinishBtn).toBeInTheDocument();
    expect(drinkFinishBtn).toBeDisabled();

    await user.click(allIngredients[0]);
    await user.click(allIngredients[1]);
    await user.click(allIngredients[2]);

    drinkFinishBtn = await screen.findByTestId(/finish-recipe-btn/i);
    expect(drinkFinishBtn).not.toBeDisabled();

    await user.click(drinkFinishBtn);
    expect(window.location.pathname).toBe(doneRecipes);
    expect(screen.getByText(/Aquamarine/i)).toBeInTheDocument();
  });

  it(('Testa se ao entrar novamente na página RecipeInProgress, os checkboxs estão checados no conponente DrinkInProgress'), async () => {
    renderWithRouterAndRedux(<App />, drinkInProgressPath);

    const allIngredients = (await screen.findAllByRole('checkbox'));
    expect(allIngredients.length).toBe(3);

    expect(allIngredients[0]).toBeChecked();
    expect(allIngredients[1]).toBeChecked();
    expect(allIngredients[2]).toBeChecked();
  });
});

describe('Testa o botão de compartilhamento', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa se ao clicar no shareBtn, o texto "Link copied!" aparece na tela no componente MealInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, mealInProgressPath);

    const mealShareBtn = await screen.findByTestId(/share-btn/i);

    expect(mealShareBtn).toBeInTheDocument();

    await user.click(mealShareBtn);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe('http://localhost:3000/meals/52771');
  });

  it('Testa se ao clicar no shareBtn, o texto "Link copied!" aparece na tela no componente DrinkInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, drinkInProgressPath);

    const mealShareBtn = await screen.findByTestId(/share-btn/i);

    expect(mealShareBtn).toBeInTheDocument();

    await user.click(mealShareBtn);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe('http://localhost:3000/drinks/718319');
  });
});

describe('Testa a função handleFvoriteBtn quando recebe uma receita com chaves vazias', () => {
  it('Testa a função handleFavoriteBtn no componente MealInProgress', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => SHAKSHUKA_MEAL,
    } as Response);

    const { user } = renderWithRouterAndRedux(<App />, mealInProgressPath2);

    const mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', blackHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Testa a função handleFavoriteBtn no componente DrinkInProgress', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => A1_DRINK,
    } as Response);

    const { user } = renderWithRouterAndRedux(<App />, drinkInProgressPath2);

    const mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', blackHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });
});

describe('Testa o botão de favoritar', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa se ao clicar no favoriteBtn, o ícone muda no componente MealInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, mealInProgressPath);

    const mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);

    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', blackHeartIcon);
    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Testa se ao clicar no favoriteBtn, o ícone muda no componente DrinkInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, drinkInProgressPath);

    const drinkFavoriteBtn = await screen.findByTestId(/favorite-btn/i);

    expect(drinkFavoriteBtn).toBeInTheDocument();
    expect(drinkFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);

    await user.click(drinkFavoriteBtn);
    expect(drinkFavoriteBtn).toHaveAttribute('src', blackHeartIcon);
    await user.click(drinkFavoriteBtn);
    expect(drinkFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Testa se o ícone muda se a receita estiver no favoriteRecipes ou não no LocalStorage no componente MealInProgress', async () => {
    mockLocalStorage();
    const { user } = renderWithRouterAndRedux(<App />, mealInProgressPath);

    let mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);

    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealFavoriteBtn).toHaveAttribute('src', blackHeartIcon);

    await user.click(mealFavoriteBtn);
    mealFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(mealFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });

  it('Testa se o ícone é o blackHeartIcon se a receita estiver no favoriteRecipes no LocalStorage no componente DrinkInProgress', async () => {
    mockLocalStorage();
    const { user } = renderWithRouterAndRedux(<App />, drinkInProgressPath);

    let drinkFavoriteBtn = await screen.findByTestId(/favorite-btn/i);

    expect(drinkFavoriteBtn).toBeInTheDocument();
    expect(drinkFavoriteBtn).toHaveAttribute('src', blackHeartIcon);

    await user.click(drinkFavoriteBtn);
    drinkFavoriteBtn = await screen.findByTestId(/favorite-btn/i);
    expect(drinkFavoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });
});
