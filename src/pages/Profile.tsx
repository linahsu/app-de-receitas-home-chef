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
    <div className="profile-page">
      <h3 data-testid="profile-email">
        {
        // Tive que fazer essa condicional para poder acessar '/profile' sem precisar ter feito o Login nos testes --felipe
        user !== undefined
          ? (
              <div className="profile-icon-and-email">
                <img src="/src/images/profileIconBS2.svg" alt="" />
                {JSON.stringify(user.email).replace(/"/g, '')}  
              </div>
            )
          : ''
        }
      </h3>

      <div className="profile-buttons">
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
