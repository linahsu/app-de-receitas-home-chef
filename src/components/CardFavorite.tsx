import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipeType } from '../types';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFavorite({ recipe }: { recipe: FavoriteRecipeType[] }) {
  const [favoriteRecipe, setFavoriteRecipe] = useState(recipe);
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
      {favoriteRecipe.length > 0 ? (
        <>
          {favoriteRecipe.map((favorite, index) => (
            <div key={ favorite.id }>
              <Link to={ `/${favorite.type}s/${favorite.id}` }>
                <img
                  src={ favorite.image }
                  alt="Foto da comida"
                  style={ { width: '300px' } }
                  data-testid={ `${index}-horizontal-image` }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>{favorite.name}</h2>
              </Link>
              {favorite.type === 'meal' ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${favorite.nationality} - ${favorite.category}`}
                </p>
              ) : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${favorite.alcoholicOrNot}`}
                </p>
              )}
              <button>
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite Icon"
                />
              </button>
              <button
                onClick={ () => handleShareBtn(favorite.type, favorite.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src="/src/images/shareIcon.svg"
                  alt="Share icon"
                />
              </button>
              {isCopied && <p>Link copied!</p>}
            </div>
          ))}
        </>
      ) : (
        <p>Nenhuma receita encontrada.</p>
      )}
    </div>
  );
}

export default CardFavorite;
