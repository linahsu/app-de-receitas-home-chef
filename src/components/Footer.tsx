import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer" data-testid="footer">
      <button onClick={ () => navigate('/drinks') }>
        <img
          src="src/images/drinkIcon.svg"
          alt="Bebidas"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button onClick={ () => navigate('/meals') }>
        <img
          src="src/images/mealIcon.svg"
          alt="Comidas"
          data-testid="meals-bottom-btn"
        />

      </button>
    </footer>
  );
}

export default Footer;
