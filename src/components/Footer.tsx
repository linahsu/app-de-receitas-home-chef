import { useNavigate } from 'react-router-dom';

import mealIconBS2 from '../images/mealIconBS2.svg';
import drinkIconBS2 from '../images/drinkIconBS2.svg';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer-div">
      <footer className="footer" data-testid="footer">
        <button onClick={ () => navigate('/meals') }>
          <img
            src={ mealIconBS2 }
            alt="Comidas"
            data-testid="meals-bottom-btn"
            width="25"
          />
        </button>
        <hr />
        <button onClick={ () => navigate('/drinks') }>
          <img
            src={ drinkIconBS2 }
            alt="Bebidas"
            data-testid="drinks-bottom-btn"
            width="25"
          />
        </button>
      </footer>

    </div>
  );
}

export default Footer;
