import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Dispatch, RecipeType } from '../types';
import { takeDinamicRecipe } from '../redux/actions/actions';

const INITIAL_VALUE = {
  type: '',
  inputValue: '',
};

function SearchBar() {
  const [searchValue, setSearchValue] = useState(INITIAL_VALUE);
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const { pathname } = useLocation();
  const path = pathname.includes('meals') ? 'meals' : 'drinks';

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dispatch(takeDinamicRecipe(searchValue, path));
    recipeCheck(result);
  };

  const recipeCheck = (result: RecipeType[] = []) => {
    if (result?.length === 1) {
      navigate(`/${path}/${result[0].idMeal || result[0].idDrink}`);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={ handleSubmit }>
        <input
          className="search-input"
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
