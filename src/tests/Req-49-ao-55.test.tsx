import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';

const user = userEvent;

const favoriteRoute = '/favorite-recipes';

const favoriteImageId1 = '0-horizontal-image';
const favoriteNameId1 = '0-horizontal-name';
const favoriteTopTextId1 = '0-horizontal-top-text';
const favoriteBtnId1 = '0-horizontal-favorite-btn';
const shareBtnId1 = '0-horizontal-share-btn';

const favoriteImageId2 = '1-horizontal-image';
const favoriteNameId2 = '1-horizontal-name';
const favoriteTopTextId2 = '1-horizontal-top-text';
const favoriteBtnId2 = '1-horizontal-favorite-btn';
const shareBtnId2 = '1-horizontal-share-btn';

const allFilterId = 'filter-by-all-btn';
const mealsFilterId = 'filter-by-meal-btn';
const drinksFilterId = 'filter-by-drink-btn';

const MOCK_DATA = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '17079',
    type: 'drink',
    nationality: '',
    category: 'Shot',
    alcoholicOrNot: 'Alcoholic',
    name: 'Baby Guinness',
    image: 'https://www.thecocktaildb.com/images/media/drink/rvyvxs1473482359.jpg',
  },
];

describe('Teste o componente FavoriteRecipes - Requisitos 49 ao 55', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(MOCK_DATA));
  });

  it('Testa se o card de comidas favoritas é renderizado corretamente', async () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);

    expect(window.location.pathname).toBe(favoriteRoute);

    const favoriteImage1 = screen.getByTestId(favoriteImageId1);
    const favoriteName1 = screen.getByTestId(favoriteNameId1);
    const topText1 = screen.getByTestId(favoriteTopTextId1);
    const favoriteBtn1 = screen.getByTestId(favoriteBtnId1);
    const shareBtn1 = screen.getByTestId(shareBtnId1);

    const favoriteImage2 = screen.getByTestId(favoriteImageId2);
    const favoriteName2 = screen.getByTestId(favoriteNameId2);
    const topText2 = screen.getByTestId(favoriteTopTextId2);
    const favoriteBtn2 = screen.getByTestId(favoriteBtnId2);
    const shareBtn2 = screen.getByTestId(shareBtnId2);

    expect(favoriteImage1).toBeInTheDocument();
    expect(favoriteName1).toBeInTheDocument();
    expect(topText1).toBeInTheDocument();
    expect(favoriteBtn1).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();

    expect(favoriteImage2).toBeInTheDocument();
    expect(favoriteName2).toBeInTheDocument();
    expect(topText2).toBeInTheDocument();
    expect(favoriteBtn2).toBeInTheDocument();
    expect(shareBtn2).toBeInTheDocument();
  });

  it('Testa se os filtros funcionam corretamente', async () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);

    expect(window.location.pathname).toBe(favoriteRoute);

    const allFilter = screen.getByTestId(allFilterId);
    const mealsFilter = screen.getByTestId(mealsFilterId);
    const drinksFilter = screen.getByTestId(drinksFilterId);

    expect(allFilter).toBeInTheDocument();
    expect(mealsFilter).toBeInTheDocument();
    expect(drinksFilter).toBeInTheDocument();

    await user.click(allFilter);

    const arrabiataName = screen.getByText('Spicy Arrabiata Penne');
    const guinnessName = screen.getByText('Baby Guinness');

    expect(arrabiataName).toBeInTheDocument();
    expect(guinnessName).toBeInTheDocument();

    await user.click(mealsFilter);

    expect(arrabiataName).toBeInTheDocument();
    expect(guinnessName).not.toBeInTheDocument();

    await user.click(drinksFilter);

    expect(arrabiataName).not.toBeInTheDocument();
  });

  it('Testa se o botão de desfavoritar está funcionando corretamente', async () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);

    expect(window.location.pathname).toBe(favoriteRoute);

    const favoriteBtn1 = screen.getByTestId(favoriteBtnId1);
    const favoriteBtn2 = screen.getByTestId(favoriteBtnId2);

    await user.click(favoriteBtn1);
    await user.click(favoriteBtn2);

    expect(screen.getByText('Nenhuma receita encontrada.')).toBeInTheDocument();
  });

  it('Testa se o botão de compartilhar está funcionando corretamente', async () => {
    renderWithRouterAndRedux(<App />, favoriteRoute);

    expect(window.location.pathname).toBe(favoriteRoute);

    const shareBtn1 = screen.getByTestId(shareBtnId1);

    await user.click(shareBtn1);

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
