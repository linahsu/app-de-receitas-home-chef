import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';
import { fetchDetailMock } from './mocks/fetchMock';

describe('Testa a renderização dos elemento e chamadas das APIs da página RecipeInProgress', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa se a página de meals contém os elementos esperados', async () => {
    renderWithRouterAndRedux(<App />, '/meals/52771/in-progress');

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
    renderWithRouterAndRedux(<App />, '/drinks/718319/in-progress');

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

describe('Testa o botão de compartilhamento', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa o componente MealInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals/52771/in-progress');

    const mealShareBtn = await screen.findByTestId(/share-btn/i);

    expect(mealShareBtn).toBeInTheDocument();

    await user.click(mealShareBtn);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe('http://localhost:3000/meals/52771');
  });

  it('Testa o componente DrinkInProgress', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks/718319/in-progress');

    const mealShareBtn = await screen.findByTestId(/share-btn/i);

    expect(mealShareBtn).toBeInTheDocument();

    await user.click(mealShareBtn);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe('http://localhost:3000/drinks/718319');
  });
});
