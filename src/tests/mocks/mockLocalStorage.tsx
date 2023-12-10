const mockFavoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '52963',
    type: 'meal',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: 'Shakshuka',
    image: 'https://www.themealdb.com/images/media/meals/g373701551450225.jpg',
  },
  {
    id: '718319',
    type: 'drink',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
  {
    id: '17222',
    type: 'drink',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg"',
  },
];

const mockInProgressRecipes = {
  drinks: {
    718319: ['0', '1'],
  },
  meals: {
    52771: ['2'],
  },
};

const mockDoneRecipes = [
  {
    id: '52839',
    type: 'meal',
    area: 'Italian',
    category: 'Pasta',
    alcoholicOrNot: undefined,
    name: 'Chilli prawn linguine',
    image: 'https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg',
    doneDate: '27-03-2023',
    tags: [],
  },
  {
    id: '52857',
    type: 'meal',
    area: 'American',
    category: 'Dessert',
    alcoholicOrNot: undefined,
    name: 'Pumpkin Pie',
    image: 'https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg',
    doneDate: '28-03-2023',
    tags: ['Halloween', 'Pie', 'Desert'],
  },
  {
    id: '718319',
    type: 'drink',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '27-03-2023',
    tags: [],
  },
  {
    id: '11157',
    type: 'drink',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Brandy Cobbler',
    image: 'https://www.thecocktaildb.com/images/media/drink/5xgu591582580586.jpg',
    doneDate: '29-03-2023',
    tags: [],
  },
  {
    id: '52963',
    type: 'meal',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: 'Shakshuka',
    image: 'https://www.themealdb.com/images/media/meals/g373701551450225.jpg',
    doneDate: '30-03-2023',
    tags: ['Egg', 'Brunch', 'Breakfast'],
  },
  {
    id: '17222',
    type: 'drink',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg"',
    doneDate: '29-03-2023',
    tags: ['Party'],
  },
];

const mockLocalStorage = () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
  localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgressRecipes));
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
};

export default mockLocalStorage;
