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
