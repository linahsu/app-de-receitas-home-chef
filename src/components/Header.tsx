import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileicon from '../images/profileIcon.svg';
// import { DoneRecipes, InProgressRecipes } from '../types';

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

  // *** MOCK DO LOCALSTORAGE PARA TESTES; DELETAR DEPOIS ***
  // function mockLocalStorage() {
  //   const corbaDetails: DoneRecipes = {
  //     id: '52977',
  //     type: 'meal',
  //     nationality: 'Turkish',
  //     category: 'Side',
  //     alcoholicOrNot: null,
  //     name: 'Corba',
  //     image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //     doneDate: '04-12-2023',
  //     tags: ['soup'],
  //   };

  //   const a1Details: DoneRecipes = {
  //     id: '17222',
  //     type: 'drink',
  //     nationality: null,
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'A1',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  //     doneDate: '03-12-2023',
  //     tags: null,
  //   };

  //   const mockedDoneRecipes = [corbaDetails, a1Details];

  //   const mockedInProgress: InProgressRecipes = {
  //     drinks: {
  //       15997: [],
  //     },
  //     meals: {
  //       53065: [],
  //     },
  //   };

  //   localStorage.setItem('doneRecipes', JSON.stringify(mockedDoneRecipes));
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(mockedInProgress));
  // }

  return (
    <div>
      {/* <button onClick={ mockLocalStorage }>Mock localStorage</button> */}
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
