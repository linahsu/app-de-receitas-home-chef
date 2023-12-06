// Busca as 12 bebidas da api e retorna um array com elas
export const fetchDrinks = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const data = await response.json();
  const drinks = data.drinks.slice(0, 12);
  return drinks;
};

// Busca as categorias de bebidas da api e retorna um array com elas
export const fetchCategoriesDrinks = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  );
  const data = await response.json();
  const categoriesDrinks = data.drinks.slice(0, 5);
  return categoriesDrinks;
};
// Busca os detalhes do drink pelo id
export const fetchDrinkById = async (drinkId: string) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
  );
  const data = await response.json();
  const drink = data.drinks[0];
  return drink;
};

// Busca todas as bebidas da api e retorna um array com elas
export const fetchAllCocktails = async () => {
  const endpointDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpointDrinks);
  const data = await response.json();
  return data.drinks;
};
