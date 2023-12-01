import { Dispatch, DrinkType, LoginType, MealType, SearchType } from '../../types';

export const LOGIN = 'LOGIN';
export const CHANGE_PLACE = 'CHANGE_PLACE';
export const CHANGE_DRINKS = 'CHANGE_DRINKS';
export const CHANGE_MEALS = 'CHANGE_MEALS';
export const DINAMIC_RECIPE = 'DINAMIC_RECIPE';

export const ActionLogin = (user: LoginType) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const PlaceAction = (place: string) => {
  return {
    type: CHANGE_PLACE,
    payload: place,
  };
};

export const DrinksAction = (drinks: any) => {
  return {
    type: CHANGE_DRINKS,
    payload: drinks,
  };
};

export const MealsAction = (meals: any) => {
  return {
    type: CHANGE_MEALS,
    payload: meals,
  };
};

export const dinamicRecipe = (recipe: DrinkType[] | MealType[], place: string) => {
  return {
    type: DINAMIC_RECIPE,
    payload: { recipe, place },
  };
};

export const takeDinamicRecipe = (searchInputs: SearchType, place: string) => {
  return async (dispatch: Dispatch) => {
    const { type, inputValue } = searchInputs;

    let selectType = '';
    switch (type) {
      case 'name':
        selectType = 'search.php?s';
        break;
      case 'ingredient':
        selectType = 'filter.php?i';
        break;
      default:
        selectType = 'search.php?f';
    }

    let selectPlace = '';
    switch (place) {
      case 'meals':
        selectPlace = 'themealdb';
        break;
      default:
        selectPlace = 'thecocktaildb';
    }

    const inputLetterCheck = () => {
      if (inputValue.length > 1 && type === 'first-letter') {
        return window.alert('Your search must have only 1 (one) character');
      }
    };

    const recipeIsEmpty = (recipe: null | []) => {
      if (!recipe) {
        window.alert("Sorry, we haven't found any recipes for these filters");
        throw new Error("Sorry, we haven't found any recipes for these filters");
      }
    };

    try {
      inputLetterCheck();
      const response = await fetch(`https://www.${selectPlace}.com/api/json/v1/1/${selectType}=${inputValue}`);
      const data = await response.json();
      recipeIsEmpty(data[place]);
      dispatch(dinamicRecipe(data[place], place));
      return data[place];
    } catch (error) {
      return error;
    }
  };
};
