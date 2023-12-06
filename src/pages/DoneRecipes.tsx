import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DoneRecipes } from '../types';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Footer from '../components/Footer';

function DoneRecipes() {
  const storedRecipes = useLocalStorage('doneRecipes', [])[0];

  const [shownRecipes, setShownRecipes] = useState<Array<DoneRecipes>>(storedRecipes);

  const filterRecipes = (filter: string) => {
    // Limpando todos filtros anteriores antes de filtrar de novo,
    // e deixando o estado com a lista inteira caso o filtro seja 'all';
    setShownRecipes(storedRecipes);

    if (filter !== 'all') {
      setShownRecipes(
        storedRecipes.filter((recipe: DoneRecipes) => recipe.type === filter),
      );
    }
  };

  return (
    shownRecipes.length > 0
      ? (
        <>
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => filterRecipes('all') }
          >
            All
          </button>

          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => filterRecipes('meal') }
          >
            Meals
          </button>

          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => filterRecipes('drink') }
          >
            Drinks
          </button>

          <ul data-testid="done-recipes-list">
            {
              shownRecipes.map((recipe, index) => {
                return (
                  <li data-testid="rendered-done-recipe" key={ index }>
                    <DoneRecipesCard recipe={ recipe } index={ index } key={ index } />
                  </li>
                );
              })
            }
          </ul>
          <Footer />
        </>
      )

      : (
        <>
          <p>No done recipes yet.</p>
          <Footer />
        </>
      )
  );
}

export default DoneRecipes;
