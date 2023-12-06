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

// Adicionadas a chaves strCategory, strArea, strInstructions e strTags
export type MealType = {
  idMeal: string,
  strMeal: string,
  strMealThumb?: string,
  strCategory: string,
  strArea: string,
  strInstructions: string,
  strTags: string
};

// Adicionadas as chaves strAlcoholic, strArea e strTags
export type DrinkType = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb?: string,
  strCategory: string,
  strAlcoholic: string,
  strArea: string,
  strInstructions: string,
  strTags: string,
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
  allMeals: MealType[],
  allDrinks: DrinkType[],
  place: string,
  drinks: DrinkType[],
  meals: MealType[],
  drinkCategories: CategoryType[],
  mealsCategories: CategoryType[],
  detailsDrink: DrinkDetailsType,
  detailsMeal: MealDetailsType,
};

export type RootState = {
  userLoginReducer: LoginType,
  mainReducer: MainReducerType,
};

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;

export type DrinkDetailsType = {
  [key: string]: any;
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: string | null;
  strGlass: string | null;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strCreativeCommonsConfirmed: string;
  dateModified: string | null;
};

export type MealDetailsType = {
  [key: string]: any;
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  dateModified: string | null;
};

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
    [id: string]: string[],
  },
  meals: {
    [id: string]: string[],
  }
};

export type InProgressProps = {
  currentMeal?: MealDetailsType | undefined;
  currentDrink?: DrinkDetailsType | undefined;
  handleFavoriteBtn: () => void;
  handleIngredientCheck: (index: number) => void;
  handleFinishBtn: () => void;
  isFavorite: boolean;
  IngredientsList: string[][];
  mesureList: string[][];
  instructionsList: [string, string][];
  ingredientCheckedList: string[];
  savedIngredientsMeals?: string[];
  savedIngredientsDrinks?: string[];
};
