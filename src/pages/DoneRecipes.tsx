import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DoneRecipeType } from '../types';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Footer from '../components/Footer';

function DoneRecipes() {
  const storedRecipes = useLocalStorage('doneRecipes', [])[0];

  const [shownRecipes, setShownRecipes] = useState<Array<DoneRecipeType>>(storedRecipes);
  const [currentFilter, setCurrentFilter] = useState(''); // Isso aqui é pra estilização --felipe

  const filterRecipes = (filter: string) => {
    // Limpando todos filtros anteriores antes de filtrar de novo,
    // e deixando o estado com a lista inteira caso o filtro seja 'all';
    setShownRecipes(storedRecipes);
    setCurrentFilter(filter);

    if (filter !== 'all') {
      setShownRecipes(
        storedRecipes.filter((recipe: DoneRecipeType) => recipe.type === filter),
      );
    }
  };

  return (
    shownRecipes.length > 0
      ? (
        <div className="done-recipes-body">
          <div className="done-recipes-filters">
            <button
              data-testid="filter-by-all-btn"
              onClick={ () => filterRecipes('all') }
              className={
                (currentFilter === 'all') ? "active" : ""
              }
            >
              All
            </button>

            <button
              data-testid="filter-by-meal-btn"
              onClick={ () => filterRecipes('meal') }
              className={
                (currentFilter === 'meal') ? "active" : ""
              }
            >
              Meals
            </button>

            <button
              data-testid="filter-by-drink-btn"
              onClick={ () => filterRecipes('drink') }
              className={
                (currentFilter === 'drink') ? "active" : ""
              }
            >
              Drinks
            </button>
          </div>

          <div 
            data-testid="done-recipes-list"
            className="done-recipes-list"
          >
            {
              shownRecipes.map((recipe, index) => {
                return (
                  <div data-testid="rendered-done-recipe" key={ index }>
                    <DoneRecipesCard recipe={ recipe } index={ index } key={ index } />
                  </div>
                );
              })
            }
          </div>
          <Footer />
        </div>
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
