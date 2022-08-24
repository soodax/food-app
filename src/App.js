import './App.scss';
import Header from './components/Header/Header';
import { Routes, Route, Navigate } from "react-router-dom";
import RecipesBlock from './components/RecipesBlock/RecipesBlock';
import MainContainer from './components/Main/MainContainer';
import Favorites from './components/Favourites/Favourites';

function App() {
  return (
    <div className='app'>
      <Header />
        <Routes>
          <Route path='/main' element={<MainContainer />} />
          <Route path='/recipes' element={<RecipesBlock />} />
          <Route path='/favourites' element={<Favorites />} />
          <Route path='/' element={<Navigate to="/main" replace />}></Route>
        </Routes>
    </div>
  );
}

export default App;
