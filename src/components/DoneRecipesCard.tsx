import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DoneRecipeType } from '../types';

function DoneRecipesCard({ recipe, index }: { recipe: DoneRecipeType, index: number }) {
  const [copiedMessage, setCopiedMessage] = useState(false);

  const copyURLToClipboard = (type: string, id: string) => {
    setCopiedMessage(true);
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
  };

  const generateImageAndHeader = (type: 'meals' | 'drinks') => {
    return (
      <div className="done-recipes-img-and-title">
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
      </div>
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
        <div className="done-recipes-meal-card">
          {generateImageAndHeader('meals')}

          <div className="done-recipes-card-info">
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category} `}
            </p>
              {
              recipe.tags
                && (recipe.tags.slice(0, 2)).map((tag, key) => {
                  return (
                    <h3 
                      data-testid={ `${index}-${tag}-horizontal-tag` } 
                      key={ key }
                      className="done-recipes-tags"
                    >
                      { tag }
                    </h3>
                  );
                })
              }
            <p data-testid={ `${index}-horizontal-done-date` }>
              <b>Done in:</b>
              {' '}
              { recipe.doneDate }
            </p>
          </div>
          <div className="done-recipes-share-div">
            <button onClick={ () => copyURLToClipboard('meals', recipe.id) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src="src/images/shareIconBS.svg"
                alt="Share"
              />
            </button>
            <span>
              { copiedMessage && <p data-testid="horizontal-copied-msg">Link copied!</p> }
            </span>

          </div>
        </div>
      )

      : (
        <div className="done-recipes-drink-card">
          {generateImageAndHeader('drinks')}
          
          <div className="done-recipes-card-info">
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.alcoholicOrNot} - ${recipe.category}` }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              <b>Done in:</b>
              {' '}
              { recipe.doneDate }
            </p>
          </div>
          <div className="done-recipes-share-div">
            <button onClick={ () => copyURLToClipboard('drinks', recipe.id) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src="src/images/shareIconBS.svg"
                alt="Share"
              />
            </button>
            <span>
              { copiedMessage && <p data-testid="horizontal-copied-msg">Link copied!</p>}
            </span>
          </div>
        </div>
      )
  );
}

export default DoneRecipesCard;
