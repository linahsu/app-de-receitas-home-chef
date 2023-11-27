import { Outlet, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { TitleObj } from '../types';
import SearchBar from './SearchBar';

function Header() {
  const titleObj: TitleObj = {
    '/meals': 'Meals',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  };

  const { pathname } = useLocation();

  const [showSearch, setShowSearch] = useState(false);

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

      {(titleObj[pathname] === 'Meals' || titleObj[pathname] === 'Drinks') && (
        <button onClick={ () => setShowSearch((prev) => !prev) }>
          <img
            src="src/images/searchIcon.svg"
            alt="ícone de pesquisa"
            data-testid="search-top-btn"
          />
        </button>
      )}

      {showSearch && <SearchBar />}

      <Outlet />

    </div>
  );
}

export default Header;
