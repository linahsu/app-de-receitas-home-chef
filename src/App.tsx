import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Header from './components/Header';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals/:id-da-receita" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id-da-receita" element={ <RecipeDetails /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/" element={ <Header /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
