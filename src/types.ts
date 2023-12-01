import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type TitleObj = {
  '/meals': string,
  '/drinks': string,
  '/profile': string,
  '/done-recipes': string,
  '/favorite-recipes': string,
  [key: string]: string;
};

export type LoginType = {
  email: string,
  password: string,
};

export type SearchType = {
  type: string,
  inputValue: string,
};

export type CategoryType = {
  strCategory: string,
};

// Adicionadas a chaves strCategory e strArea e strInstructions
export type MealType = {
  idMeal: string,
  strMeal: string,
  strMealThumb?: string,
  strCategory: string,
  strArea: string,
  strInstructions: string,
};

// Adicionadas as chaves strAlcoholic e strArea
export type DrinkType = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb?: string,
  strAlcoholic: string,
  strArea: string,
};

export type RecipeType = {
  idMeal?: string,
  strMeal?: string,
  strMealThumb?: string,
  idDrink?: string,
  strDrink?: string,
  strDrinkThumb?: string,
};

export type MainReducerType = {
  place: string,
  drinks: DrinkType[],
  meals: MealType[],
  drinkCategories: CategoryType[],
  mealsCategories: CategoryType[],
};

export type RootState = {
  userLoginReducer: LoginType,
  mainReducer: MainReducerType,
};

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;

export type DoneRecipes = {
  id: string,
  type: string,
  nationality: string | null,
  category: string | null,
  alcoholicOrNot: string | null,
  name: string,
  image: string,
  doneDate: string,
  tags: string[] | null,
};

export type FavoriteRecipes = {
  id: string,
  type: string,
  nationality: string | null,
  category: string | null,
  alcoholicOrNot: string | null,
  name: string,
  image: string,
};

export type InProgressRecipes = {
  drinks: {
    id: string[],
  },
  meals: {
    id: string[],
  }
};
