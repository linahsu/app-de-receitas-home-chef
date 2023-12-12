import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipeType } from '../types';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFavorite({ recipe,
  index,
  handleFavoriteBtn }:
{ recipe: FavoriteRecipeType,
  index: number,
  handleFavoriteBtn: (recipesId: string) => void }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShareBtn = (type: string, id: string) => {
    const currentUrl = `${window.location.origin}/${type}s/${id}`;
    try {
      navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy:', error);
      window.alert('Failed to copy the link!');
      setIsCopied(false);
    }
  };

  return (
    <div>
      <div key={ recipe.id } className="done-recipes-card">
        <div className="done-recipes-img-and-dd">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt="Foto da comida"
              style={ { width: '100px' } }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>

          <button onClick={ () => handleFavoriteBtn(recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="Black heart icon"
              width="25"
            />
          </button>
        </div>

        <div className="done-recipes-card-info">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          </Link>

          {recipe.type === 'meal' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.alcoholicOrNot}`}
            </p>
          )}

          {isCopied && (
            <h4
              data-testid="horizontal-copied-msg"
              className="done-recipes-link-copied"
            >
              Link copied!
            </h4>
          )}
        </div>

        <div className="done-recipes-share">
          <div />
          <button
            onClick={ () => handleShareBtn(recipe.type, recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src="/src/images/shareIconBS.svg"
              alt="Share icon"
              width="20"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardFavorite;
