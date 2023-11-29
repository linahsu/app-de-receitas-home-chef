import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Dispatch, RootState } from '../types';
import { takeDinamicRecipe } from '../redux/actions/actions';

const INITIAL_VALUE = {
  type: '',
  inputValue: '',
};

function SearchBar() {
  const [searchValue, setSearchValue] = useState(INITIAL_VALUE);
  const { place, drinks, meals } = useSelector((state: RootState) => state.mainReducer);
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const { pathname } = useLocation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setSearchValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange2 = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, id } = event.target;
    setSearchValue((prevState) => ({
      ...prevState,
      [name]: id,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(takeDinamicRecipe(searchValue, pathname));
  };

  const recipeCheck = () => {
    switch (place) {
      case 'drinks':
        if (drinks.length === 1) {
          const lala = drinks[0];
          return navigate(`/${place}/${lala.idDrink}`);
        }
        break;

      case 'meals':
        if (meals.length === 1) {
          const lala = meals[0];
          return navigate(`/${place}/${lala.idMeal}`);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    recipeCheck();
  }, [drinks, meals]);

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="search-input"
          id="inputValue"
          name="inputValue"
          type="text"
          value={ searchValue.inputValue }
          onChange={ handleChange }
          placeholder="Search"
        />
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="type"
            id="ingredient"
            value="ingredient"
            onChange={ handleChange2 }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="type"
            id="name"
            value="name"
            onChange={ handleChange2 }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="type"
            id="first-letter"
            value="first-letter"
            onChange={ handleChange2 }
          />
          First letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
