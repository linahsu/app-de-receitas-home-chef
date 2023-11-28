import Footer from '../components/Footer';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  const userEmail = JSON.stringify(useLocalStorage('user')[0].email)

  return (
    <div>
      <h3 data-testid="profile-email">{ userEmail.replace(/"/g, '') }</h3>

      <div>
        <button data-testid="profile-done-btn">Done recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
