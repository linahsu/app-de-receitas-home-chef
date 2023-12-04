import { useNavigate } from 'react-router-dom';
import mealicon from '../images/mealIcon.svg';
import drinkicon from '../images/drinkIcon.svg';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer" data-testid="footer">
      <button onClick={ () => navigate('/drinks') }>
        <img
          src={ drinkicon }
          alt="Bebidas"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button onClick={ () => navigate('/meals') }>
        <img
          src={ mealicon }
          alt="Comidas"
          data-testid="meals-bottom-btn"
        />

      </button>
    </footer>
  );
}

export default Footer;
