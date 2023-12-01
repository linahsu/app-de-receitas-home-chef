import { AnyAction } from 'redux';
import { fetchCategoriesMeals } from '../../utils/apiMeals';
import { fetchCategoriesDrinks } from '../../utils/apiDrinks';

export const INITIAL_STATE = {
  place: '',
  meals: [],
  drinks: [],
  drinkCategories: await fetchCategoriesDrinks(),
  mealsCategories: await fetchCategoriesMeals(),
  detailsDrink: {},
  detailsMeal: {},
  allMeals: [],
  allDrinks: [],
};

export const mainReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case 'ALL_MEALS':
      return { ...state, allMeals: action.payload };
    case 'ALL_DRINKS':
      return { ...state, allDrinks: action.payload };
    case 'CHANGE_PLACE':
      return { ...state, place: action.payload };
    case 'CHANGE_MEALS':
      return { ...state, meals: action.payload };
    case 'CHANGE_DRINKS':
      return { ...state, drinks: action.payload };
    case 'DINAMIC_RECIPE':
      return {
        ...state,
        meals: [],
        drinks: [],
        [action.payload.place]: action.payload.recipe };
    case 'DETAILS_DRINK':
      return { ...state, detailsDrink: action.payload };
    case 'DETAILS_MEAL':
      return { ...state, detailsMeal: action.payload };
    default:
      return state;
  }
};
