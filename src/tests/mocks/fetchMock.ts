import mockAllMeals from './mockAllMeals';
import mockAllDrinks from './mockAllDrinks';
import mock12Drinks from './mock12Drinks';
import mock12Meals from './mock12Meals';
import { AQUAMARINE_DRINK } from './mockDrinkDetail';
import { ARABIATA_MEAL } from './mockMealDetail';

const POSSIBLE_RESPONSE: any = {
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': mockAllMeals,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': mockAllDrinks,
};

const fetchMock = (url: string) => Promise.resolve({
  status: 200,
  ok: true,
  json: async () => (POSSIBLE_RESPONSE[url] ? POSSIBLE_RESPONSE[url] : mockAllMeals),
});

const POSSIBLE_RESPONSES: any = {
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': mock12Meals,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': mock12Drinks,
};

const fetchTwelveMock = (url: string) => Promise.resolve({
  status: 200,
  ok: true,
  json: async () => (POSSIBLE_RESPONSES[url] ? POSSIBLE_RESPONSES[url] : mock12Drinks),
});

const POSSIBLE_RESPONSE_DETAIL: any = {
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=718319': AQUAMARINE_DRINK,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771': ARABIATA_MEAL,
};

const fetchDetailMock = (url: string) => Promise.resolve({
  status: 200,
  ok: true,
  json: async () => (
    POSSIBLE_RESPONSE_DETAIL[url] ? POSSIBLE_RESPONSE_DETAIL[url] : AQUAMARINE_DRINK),
});

export { fetchMock, fetchTwelveMock, fetchDetailMock };
