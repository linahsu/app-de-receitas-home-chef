import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../types';

function DoneRecipesCard({ recipe, index }: { recipe: DoneRecipeType, index: number }) {
  const [copiedMessage, setCopiedMessage] = useState(false);

  const copyURLToClipboard = (type: string, id: string) => {
    setCopiedMessage(true);
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
  };

  return (
    <div className="done-recipes-card">
      <div className="done-recipes-img-and-dd">
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            width="100"
            height="100"
          />
        </Link>

        <div className="done-recipes-done-date">
          <p data-testid={ `${index}-horizontal-done-date` }>
            <b>Done in:</b>
            {' '}
            { recipe.doneDate }
          </p>
        </div>
      </div>

      <div className="done-recipes-card-info">
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <h3
            data-testid={ `${index}-horizontal-name` }
            className="done-recipes-name"
          >
            { recipe.name }
          </h3>
        </Link>

        {
          recipe.type === 'meal'
            ? (
              <div>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category} `}
                </p>
                {
                recipe.tags
                && (recipe.tags.slice(0, 2)).map((tag, key) => {
                  return (
                    <p
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ key }
                      className="done-recipes-tags"
                    >
                      {tag}
                    </p>
                  );
                })
              }
              </div>
            )
            : (
              <div>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${recipe.alcoholicOrNot} - ${recipe.category}` }
                </p>
              </div>
            )
        }
        {
          copiedMessage
            && (
              <h4
                data-testid="horizontal-copied-msg"
                className="done-recipes-link-copied"
              >
                Link copied!
              </h4>
            )
        }
      </div>
      <div className="done-recipes-share">
        <button onClick={ () => copyURLToClipboard(recipe.type, recipe.id) }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src="src/images/shareIconBS.svg"
            alt="Share"
          />
        </button>

      </div>
    </div>
  );
}

export default DoneRecipesCard;
