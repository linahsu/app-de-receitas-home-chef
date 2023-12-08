import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';
import { fetchDetailMock } from './mocks/fetchMock';
import mockLocalStorage from './mocks/mockLocalStorage';

const mealInProgressPath = '/meals/52771/in-progress';
const drinkInProgressPath = '/drinks/718319/in-progress';

describe('Testa a renderização dos elemento e chamadas das APIs da página RecipeInProgress', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa se a página de meals contém os elementos esperados', async () => {
    renderWithRouterAndRedux(<App />, mealInProgressPath);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');

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
    expect(mealImage).toBeInTheDocument();
    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealShareBtn).toBeInTheDocument();
    expect(mealInstructions).toBeInTheDocument();
    expect(mealIngredients).toBeInTheDocument();
    expect(mealFinishBtn).toBeInTheDocument();
  });

  it('Testa se a página de drinks contém os elementos esperados', async () => {
    renderWithRouterAndRedux(<App />, drinkInProgressPath);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=718319');

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
    expect(drinkImage).toBeInTheDocument();
    expect(drinkFavoriteBtn).toBeInTheDocument();
    expect(drinkShareBtn).toBeInTheDocument();
    expect(drinkInstructions).toBeInTheDocument();
    expect(drinkIngredients).toBeInTheDocument();
    expect(drinkFinishBtn).toBeInTheDocument();
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
    expect(window.location.pathname).toBe('/done-recipes');
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
    expect(window.location.pathname).toBe('/done-recipes');
    expect(screen.getByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();
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

describe('Testa o botão de favoritar', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  const whiteHeartIcon = '/src/images/whiteHeartIcon.svg';
  const blackHeartIcon = '/src/images/blackHeartIcon.svg';

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
