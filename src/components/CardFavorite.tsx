import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipeType } from '../types';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFavorite({ recipe,
  index,
  handleFavoriteBtn }:
{ recipe: FavoriteRecipeType,
  index: number,
  handleFavoriteBtn: () => void }) {
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
      <div key={ recipe.id }>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt="Foto da comida"
            style={ { width: '300px' } }
            data-testid={ `${index}-horizontal-image` }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
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
        <button onClick={ handleFavoriteBtn }>
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="Black heart icon"
          />
        </button>
        <button
          onClick={ () => handleShareBtn(recipe.type, recipe.id) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src="/src/images/shareIcon.svg"
            alt="Share icon"
          />
        </button>
        {isCopied && <p>Link copied!</p>}
      </div>
    </div>
  );
}

export default CardFavorite;
