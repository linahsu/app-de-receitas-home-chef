import { useNavigate } from 'react-router-dom';
import mealicon from '../images/mealIconBS.svg';
import drinkicon from '../images/drinkIconBS.svg';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer-div">
      <footer className="footer" data-testid="footer">
        <button onClick={ () => navigate('/meals') }>
          <img
            src={ mealicon }
            alt="Comidas"
            data-testid="meals-bottom-btn"
            width="30"
          />
        </button>
        <hr />
        <button onClick={ () => navigate('/drinks') }>
          <img
            src={ drinkicon }
            alt="Bebidas"
            data-testid="drinks-bottom-btn"
            width="30"
          />
        </button>
      </footer>

    </div>
  );
}

export default Footer;
