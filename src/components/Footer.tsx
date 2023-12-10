import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer-div">
      <footer className="footer" data-testid="footer">
        <button onClick={ () => navigate('/meals') }>
          <img
            src="src/images/mealIconBS2.svg"
            alt="Comidas"
            data-testid="meals-bottom-btn"
            width="25"
          />
        </button>
        <hr />
        <button onClick={ () => navigate('/drinks') }>
          <img
            src="src/images/drinkIconBS2.svg"
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
