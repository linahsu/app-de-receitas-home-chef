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

export type MealType = {
  idMeal: string,
  strMeal: string,
  strMealThumb?: string,
};

export type DrinkType = {
  idDrink:string,
  strDrink:string,
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
  login: LoginType,
  mainReducer: MainReducerType,
};

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;
