import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import App from '../App';
import { fetchDetailMock } from './mocks/fetchMock';

describe('Testa a renderização dos elemento e chamadas das APIs da página RecipeInProgress', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchDetailMock as any);
  });

  it('Testa se a página de meals contém os elementos esperados', async () => {
    renderWithRouterAndRedux(<App />, '/meals/52771/in-progress');

    const mealName = await screen.findByText(/Spicy Arrabiata Penne/i);
  });
});
