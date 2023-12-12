import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Header from './components/Header';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Header /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/meals/:idDaReceita" element={ <RecipeDetails /> } />
        <Route path="/drinks/:idDaReceita" element={ <RecipeDetails /> } />
        <Route path="/meals/:idDaReceita/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/drinks/:idDaReceita/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
