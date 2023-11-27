import { Outlet, useLocation, Link } from 'react-router-dom';
import { TitleObj } from '../types';

function Header() {
  const titleObj: TitleObj = {
    '/meals': 'Meals',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  };

  const { pathname } = useLocation();

  return (
    <div>

      <h1 data-testid="page-title">{ titleObj[pathname] }</h1>

      <Link to="/profile">
        <img
          src="src/images/profileIcon.svg"
          alt="ícone do perfil"
          data-testid="profile-top-btn"
        />
      </Link>

      <button>
        <img
          src="src/images/searchIcon.svg"
          alt="ícone de pesquisa"
          data-testid="search-top-btn"
        />
      </button>

      <Outlet />

    </div>
  );
}

export default Header;
