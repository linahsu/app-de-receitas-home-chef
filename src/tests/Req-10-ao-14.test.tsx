import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import { fetchTwelveMock } from './mocks/fetchMock';
import App from '../App';

const user = userEvent;

const topBtnId = 'search-top-btn';
const searchId = 'search-input';
const ingredientId = 'ingredient-search-radio';
const nameId = 'name-search-radio';
const firstLetterId = 'first-letter-search-radio';

const MOCK_DATA_MEALS = {
  idMeal: '52771',
  strMeal: 'Spicy Arrabiata Penne',
};

// fetch e beforeEach feito em monitoria com o Willian
const fetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    return Promise.resolve({ meals: [MOCK_DATA_MEALS] });
  },
});

describe('Teste o componente Search Bar - Requisitos 10 ao 14', () => {
  beforeEach(() => {
    global.fetch = vi.fn(fetch) as any;
  });

  it('Testa se a barra de pesquisa, os radio buttons e o botão Search são renderizados na página', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId(topBtnId);
    await user.click(searchTopBtn);

    expect(screen.getByTestId(searchId)).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId(ingredientId);
    const nameRadio = screen.getByTestId(nameId);
    const firstLetterRadio = screen.getByTestId(firstLetterId);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('Testa se os radio buttons selecionam apenas um deles ao serem clicados', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId(topBtnId);
    await user.click(searchTopBtn);

    const ingredientRadio = screen.getByTestId(ingredientId);
    const nameRadio = screen.getByTestId(nameId);
    const firstLetterRadio = screen.getByTestId(firstLetterId);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    await user.click(ingredientRadio);

    expect(ingredientRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    await user.click(nameRadio);

    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    await user.click(firstLetterRadio);

    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).toBeChecked();
  });

  it('Testa se a barra de pesquisa, os radio buttons e o botão Search estão funcionando', async () => {
    renderWithRouterAndRedux(<App />, '/meals');

    expect(window.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId(topBtnId);
    await user.click(searchTopBtn);

    expect(screen.getByTestId(searchId)).toBeInTheDocument();

    await user.type(screen.getByTestId(searchId), 'arrabiata');

    expect(screen.getByTestId(searchId)).toHaveValue('arrabiata');

    const nameRadio = screen.getByTestId(nameId);
    expect(nameRadio).toBeInTheDocument();
    expect(nameRadio).not.toBeChecked();

    await user.click(nameRadio);

    expect(nameRadio).toBeChecked();

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

    // await user.click(screen.getByRole('button', { name: 'Search' }));

    // expect(window.location.pathname).toBe('/meals/52771');
  });
});

const MOCK_DATA_DRINKS = {
  idDrink: '17079',
  strDrink: 'Baby Guinness',
};

// fetch e beforeEach feito em monitoria com o Willian
const fetchDrinks = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    return Promise.resolve({ drinks: [MOCK_DATA_DRINKS] });
  },
});

describe('Teste o componente Search Bar - Requisitos 14, 90% coverage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(fetchDrinks) as any;
  });
  it('Testa se retorna o drink guinness', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    expect(window.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(topBtnId);
    await user.click(searchTopBtn);

    expect(screen.getByTestId(searchId)).toBeInTheDocument();

    await user.type(screen.getByTestId(searchId), 'guinness');

    expect(screen.getByTestId(searchId)).toHaveValue('guinness');

    const nameRadio = screen.getByTestId(nameId);
    expect(nameRadio).toBeInTheDocument();
    expect(nameRadio).not.toBeChecked();

    await user.click(nameRadio);

    expect(nameRadio).toBeChecked();

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

    // await user.click(screen.getByRole('button', { name: 'Search' }));

    // expect(window.location.pathname).toBe('/drinks/17079');
  });
});

describe('Testa se Drinks', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchTwelveMock as any);
  });
  it('Testa se', async () => {
    renderWithRouterAndRedux(<App />, '/drinks');

    const searchTopBtn = screen.getByTestId(topBtnId);
    await user.click(searchTopBtn);
    await user.type(screen.getByTestId(searchId), 'guinness');
    const nameRadio = screen.getByTestId(nameId);
    await user.click(nameRadio);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    // expect(screen.findByTestId('recipe-title')).toBeInTheDocument();
  });
});

// describe('Testa se Meals', () => {
//   beforeEach(() => {
//     vi.spyOn(global, 'fetch').mockImplementation(fetchTwelveMock as any);
//   });
//   it('Testa se', async () => {
//     renderWithRouterAndRedux(<App />, '/meals');

//     const searchTopBtn = screen.getByTestId(topBtnId);
//     await user.click(searchTopBtn);
//     await user.type(screen.getByTestId(searchId), 'arrabiata');
//     const nameRadio = screen.getByTestId(nameId);
//     await user.click(nameRadio);

//     await user.click(screen.getByRole('button', { name: 'Search' }));

//     expect(window.location.pathname).toBe('/meals');
//   });
// });
