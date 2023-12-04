import mockAllMeals from './mockAllMeals';
import mockAllDrinks from './mockAllDrinks';
import mock12Drinks from './mock12Drinks';
import mock12Meals from './mock12Meals';

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

export { fetchMock, fetchTwelveMock };
