import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  const navigate = useNavigate();

  const user = useLocalStorage('user')[0];

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <h3 data-testid="profile-email">
        {
        // Tive que fazer essa condicional para poder acessar '/profile' sem precisar ter feito o Login nos testes --felipe
        user !== undefined
          ? JSON.stringify(user.email).replace(/"/g, '')
          : ''
        }
      </h3>

      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ () => logout() }
        >
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
