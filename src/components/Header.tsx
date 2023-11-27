import { Outlet, useParams } from 'react-router-dom';

function Header() {
  const params = useParams();

  return (
    <div>
      <h1 data-testid="page-title">Título</h1>
      <img
        src="src/images/profileIcon.svg"
        alt="ícone do perfil"
        data-testid="profile-top-btn"
      />
      <img
        src="src/images/searchIcon.svg"
        alt="ícone de pesquisa"
        data-testid="search-top-btn"
      />
      <Outlet />
    </div>
  );
}

export default Header;
