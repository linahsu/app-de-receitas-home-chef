import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileicon from '../images/profileIcon.svg';

function Header() {
  const titleObj: { [key: string]: string } = {
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
      <h1 data-testid="page-title">{titleObj[pathname]}</h1>
      <Link to="/profile">
        <img
          src={ profileicon }
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
