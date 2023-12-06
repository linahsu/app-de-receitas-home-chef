import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DoneRecipes } from '../types';

function DoneRecipesCard({ recipe, index }: { recipe: DoneRecipes, index: number }) {
  const [copiedMessage, setCopiedMessage] = useState(false);

  const copyURLToClipboard = (type: string, id: string) => {
    setCopiedMessage(true);
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
  };

  const generateImageAndHeader = (type: 'meals' | 'drinks') => {
    return (
      <NavLink to={ `/${type}/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          width="100"
          height="100"
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h3>
      </NavLink>
    );
  };

  // // Parar formatar data salva no localStorage para modelo "DD-MM-AAAA HH:MM"
  // const formatDate = (date: string) => {
  //   const secondColon = date.indexOf(':') + 1;
  //   return (
  //     date
  //       .slice(0, date.indexOf(':', secondColon))
  //       .replace('T', ' // ')
  //   );
  // };

  const { type } = recipe;

  return (
    type === 'meal'
      ? (
        <>
          {generateImageAndHeader('meals')}
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category} `}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            <b>Done in:</b>
            {' '}
            { recipe.doneDate }
          </p>
          <ul className="done-recipes-tags">
            {
            recipe.tags
              && (recipe.tags.slice(0, 2)).map((tag, key) => {
                return (
                  <li data-testid={ `${index}-${tag}-horizontal-tag` } key={ key }>
                    { tag }
                  </li>
                );
              })
          }
          </ul>
          <button onClick={ () => copyURLToClipboard('meals', recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src="src/images/shareIcon.svg"
              alt="Share"
            />
            { copiedMessage && <p data-testid="horizontal-copied-msg">Link copied!</p> }
          </button>
        </>
      )

      : (
        <>
          {generateImageAndHeader('drinks')}
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${recipe.alcoholicOrNot} - ${recipe.category}` }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            <b>Done in:</b>
            {' '}
            { recipe.doneDate }
          </p>
          <button onClick={ () => copyURLToClipboard('drinks', recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src="src/images/shareIcon.svg"
              alt="Share"
            />
          </button>
          { copiedMessage && <p data-testid="horizontal-copied-msg">Link copied!</p>}
        </>
      )
  );
}

export default DoneRecipesCard;
